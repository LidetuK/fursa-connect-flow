import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface N8nBridgeRequest {
  integration_id: string;
  contact_phone: string;
  contact_name?: string;
  message_text: string;
  conversation_id?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const n8nWebhookUrl = Deno.env.get('N8N_WEBHOOK_URL')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { integration_id, contact_phone, contact_name, message_text, conversation_id }: N8nBridgeRequest = await req.json();

    // Get integration details
    const { data: integration, error: integrationError } = await supabase
      .from('whatsapp_integrations')
      .select('*')
      .eq('id', integration_id)
      .single();

    if (integrationError || !integration) {
      throw new Error('Integration not found');
    }

    // Send message to n8n webhook
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${integration.n8n_webhook_token}`,
      },
      body: JSON.stringify({
        integration_id,
        contact_phone,
        contact_name,
        message_text,
        conversation_id,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!n8nResponse.ok) {
      console.error('Failed to send message to n8n:', await n8nResponse.text());
      throw new Error('Failed to send message to n8n');
    }

    const n8nResult = await n8nResponse.json();
    console.log('n8n response:', n8nResult);

    // If n8n returned a response message, send it back via WhatsApp
    if (n8nResult.message) {
      const whatsappResponse = await fetch(
        `${supabaseUrl}/functions/v1/whatsapp-message-sender`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            integration_id,
            to: contact_phone,
            message: n8nResult.message,
            conversation_id,
          }),
        }
      );

      if (!whatsappResponse.ok) {
        console.error('Failed to send WhatsApp response:', await whatsappResponse.text());
      } else {
        console.log('Auto-reply sent successfully');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        n8n_processed: true,
        auto_reply_sent: !!n8nResult.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in n8n bridge:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}); 