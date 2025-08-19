import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TwilioWebhookPayload {
  MessageSid: string;
  From: string;
  To: string;
  Body: string;
  NumMedia: string;
  MediaUrl0?: string;
  MediaUrl1?: string;
  MediaUrl2?: string;
  MediaUrl3?: string;
  MediaUrl4?: string;
  MediaUrl5?: string;
  MediaUrl6?: string;
  MediaUrl7?: string;
  MediaUrl8?: string;
  MediaUrl9?: string;
  MediaContentType0?: string;
  MediaContentType1?: string;
  MediaContentType2?: string;
  MediaContentType3?: string;
  MediaContentType4?: string;
  MediaContentType5?: string;
  MediaContentType6?: string;
  MediaContentType7?: string;
  MediaContentType8?: string;
  MediaContentType9?: string;
}

interface Dialog360WebhookPayload {
  event: string;
  timestamp: string;
  data: {
    phone_number_id?: string;
    phone_number?: string;
    status?: string;
    message?: {
      id: string;
      from: string;
      to: string;
      text?: {
        body: string;
      };
      type: string;
      timestamp: string;
    };
  };
}

serve(async (req) => {
  console.log('=== WEBHOOK RECEIVED ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle webhook verification
    const url = new URL(req.url);
    const contentType = req.headers.get('content-type') || '';

    // For now, we'll accept all webhooks. In production, you should verify signatures
    if (req.method === 'GET') {
      return new Response('OK', {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
      });
    }

    let payload: any;
    let webhookType: 'twilio' | '360dialog' = 'twilio';

    // Determine webhook type based on content type and payload structure
    if (contentType.includes('application/x-www-form-urlencoded')) {
      // Twilio webhook
      const formData = await req.formData();
      payload = {
        MessageSid: formData.get('MessageSid') as string,
        From: formData.get('From') as string,
        To: formData.get('To') as string,
        Body: formData.get('Body') as string,
        NumMedia: formData.get('NumMedia') as string,
      };
      webhookType = 'twilio';
    } else {
      // 360dialog webhook
      payload = await req.json();
      webhookType = '360dialog';
    }

    console.log('Webhook type:', webhookType);
    console.log('Webhook payload:', JSON.stringify(payload, null, 2));

    if (webhookType === 'twilio') {
      // Handle Twilio webhook
      const twilioPayload = payload as TwilioWebhookPayload;
      
      // Extract phone number from Twilio format (remove 'whatsapp:' prefix)
      const contactPhone = twilioPayload.From.replace('whatsapp:', '');
      const messageText = twilioPayload.Body;
      const messageId = twilioPayload.MessageSid;

      // Find the integration based on the To number
      const { data: integrations, error: integrationError } = await supabase
        .from('whatsapp_integrations')
        .select('*')
        .eq('phone_number', twilioPayload.To.replace('whatsapp:', ''));

      if (integrationError || !integrations || integrations.length === 0) {
        console.error('No integration found for phone number:', twilioPayload.To);
        return new Response(
          JSON.stringify({ error: 'Integration not found' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      const integration = integrations[0];

      // Process Twilio message
      await processIncomingMessage(supabase, integration, contactPhone, messageText, messageId, 'text');

    } else if (webhookType === '360dialog') {
      // Handle 360dialog webhook
      const dialogPayload = payload as Dialog360WebhookPayload;
      
      if (dialogPayload.event === 'message') {
        // Handle incoming message
        const contactPhone = dialogPayload.data.message?.from || '';
        const messageText = dialogPayload.data.message?.text?.body || '';
        const messageId = dialogPayload.data.message?.id || '';
        const messageType = dialogPayload.data.message?.type || 'text';

        // Find integration by phone number ID
        const { data: integrations, error: integrationError } = await supabase
          .from('whatsapp_integrations')
          .select('*')
          .eq('phone_number_id', dialogPayload.data.phone_number_id);

        if (integrationError || !integrations || integrations.length === 0) {
          console.error('No integration found for phone number ID:', dialogPayload.data.phone_number_id);
          return new Response(
            JSON.stringify({ error: 'Integration not found' }),
            { 
              status: 404, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const integration = integrations[0];

        // Process 360dialog message
        await processIncomingMessage(supabase, integration, contactPhone, messageText, messageId, messageType);

      } else if (dialogPayload.event === 'account_status_update') {
        // Handle account status updates
        console.log('Account status update:', dialogPayload.data);
        
        // Update integration status if needed
        if (dialogPayload.data.phone_number_id && dialogPayload.data.status) {
          await supabase
            .from('whatsapp_integrations')
            .update({ 
              status: dialogPayload.data.status === 'APPROVED' ? 'connected' : 'pending'
            })
            .eq('phone_number_id', dialogPayload.data.phone_number_id);
        }
      }
    }

    console.log('Webhook processed successfully');
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
})

async function processIncomingMessage(
  supabase: any, 
  integration: any, 
  contactPhone: string, 
  messageText: string, 
  messageId: string, 
  messageType: string
) {
  // Find or create conversation
  let conversationId = null;
  const { data: existingConversation } = await supabase
    .from('conversations')
    .select('id')
    .eq('integration_id', integration.id)
    .eq('contact_phone', contactPhone)
    .single();

  if (existingConversation) {
    conversationId = existingConversation.id;
  } else {
    // Create new conversation
    const { data: newConversation, error: conversationError } = await supabase
      .from('conversations')
      .insert({
        integration_id: integration.id,
        contact_phone: contactPhone,
        contact_name: null,
        last_message: messageText,
        last_message_at: new Date().toISOString(),
        status: 'active'
      })
      .select()
      .single();

    if (conversationError) {
      console.error('Error creating conversation:', conversationError);
    } else {
      conversationId = newConversation.id;
    }
  }

  // Store the inbound message
  const { error: messageError } = await supabase
    .from('whatsapp_messages')
    .insert({
      integration_id: integration.id,
      conversation_id: conversationId,
      contact_phone: contactPhone,
      message_text: messageText,
      message_type: messageType,
      media_url: null,
      direction: 'inbound',
      whatsapp_message_id: messageId,
      status: 'received'
    });

  if (messageError) {
    console.error('Error storing inbound message:', messageError);
  }

  // Update conversation with latest message
  if (conversationId) {
    await supabase
      .from('conversations')
      .update({
        last_message: messageText,
        last_message_at: new Date().toISOString(),
      })
      .eq('id', conversationId);
  }

  // Forward to n8n for AI processing if webhook URL is configured
  if (integration.n8n_webhook_token) {
    try {
      const n8nPayload = {
        message_text: messageText,
        contact_phone: contactPhone,
        integration_id: integration.id,
        conversation_id: conversationId,
        message_id: messageId
      };

      const n8nResponse = await fetch(
        `${integration.webhook_url}?token=${integration.n8n_webhook_token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(n8nPayload)
        }
      );

      if (!n8nResponse.ok) {
        console.error('n8n webhook failed:', await n8nResponse.text());
      }
    } catch (error) {
      console.error('Error forwarding to n8n:', error);
    }
  }
}