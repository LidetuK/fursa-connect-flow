import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WhatsAppMessage {
  id: string;
  from: string;
  timestamp: string;
  type: 'text' | 'image' | 'document' | 'audio' | 'video';
  text?: {
    body: string;
  };
  image?: {
    id: string;
    mime_type: string;
    sha256: string;
  };
  document?: {
    id: string;
    filename: string;
    mime_type: string;
    sha256: string;
  };
  audio?: {
    id: string;
    mime_type: string;
    sha256: string;
    voice: boolean;
  };
  video?: {
    id: string;
    mime_type: string;
    sha256: string;
  };
}

interface WebhookPayload {
  integration_id: string;
  n8n_token: string;
  message: WhatsAppMessage;
  contact?: {
    profile?: {
      name: string;
    };
    wa_id: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('WhatsApp webhook received');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: WebhookPayload = await req.json();
    console.log('Webhook payload:', JSON.stringify(payload, null, 2));

    const { integration_id, n8n_token, message, contact } = payload;

    // Verify the integration exists and token matches
    const { data: integration, error: integrationError } = await supabase
      .from('whatsapp_integrations')
      .select('*')
      .eq('id', integration_id)
      .eq('n8n_webhook_token', n8n_token)
      .single();

    if (integrationError || !integration) {
      console.error('Invalid integration or token:', integrationError);
      return new Response(
        JSON.stringify({ error: 'Invalid integration or token' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Extract message content based on type
    let messageText = '';
    let mediaUrl = '';
    
    switch (message.type) {
      case 'text':
        messageText = message.text?.body || '';
        break;
      case 'image':
      case 'document':
      case 'audio':
      case 'video':
        messageText = `[${message.type.toUpperCase()}]`;
        // In a real implementation, you'd download and store the media
        mediaUrl = message[message.type]?.id || '';
        break;
      default:
        messageText = '[UNSUPPORTED MESSAGE TYPE]';
    }

    const contactPhone = contact?.wa_id || message.from;
    const contactName = contact?.profile?.name || null;

    // Check if conversation exists for this contact
    let conversationId = null;
    
    // First, try to find existing conversation through participants
    const { data: existingParticipant } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('participant_type', 'whatsapp')
      .eq('participant_identifier', contactPhone)
      .single();

    if (existingParticipant) {
      conversationId = existingParticipant.conversation_id;
    } else {
      // Create new conversation
      const { data: newConversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          title: contactName || contactPhone,
          status: 'active',
          channel: 'whatsapp',
          last_message: messageText,
          last_message_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (conversationError) {
        console.error('Error creating conversation:', conversationError);
        throw conversationError;
      }

      conversationId = newConversation.id;

      // Create participant entry
      await supabase
        .from('conversation_participants')
        .insert({
          conversation_id: conversationId,
          participant_type: 'whatsapp',
          participant_identifier: contactPhone,
          participant_name: contactName,
        });
    }

    // Store the WhatsApp message
    const { error: messageError } = await supabase
      .from('whatsapp_messages')
      .insert({
        integration_id,
        conversation_id: conversationId,
        contact_phone: contactPhone,
        contact_name: contactName,
        message_text: messageText,
        message_type: message.type,
        media_url: mediaUrl,
        direction: 'inbound',
        whatsapp_message_id: message.id,
        status: 'delivered',
      });

    if (messageError) {
      console.error('Error storing message:', messageError);
      throw messageError;
    }

    // Update conversation with latest message
    await supabase
      .from('conversations')
      .update({
        last_message: messageText,
        last_message_at: new Date().toISOString(),
      })
      .eq('id', conversationId);

    console.log('Message processed successfully');

    return new Response(
      JSON.stringify({ success: true, conversation_id: conversationId }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});