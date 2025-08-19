import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendMessageRequest {
  integration_id: string;
  to: string;
  message: string;
  conversation_id?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('WhatsApp message sender called');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { integration_id, to, message, conversation_id }: SendMessageRequest = await req.json();
    console.log('Send message request:', { integration_id, to, message, conversation_id });

    // Verify the integration belongs to the user
    const { data: integration, error: integrationError } = await supabase
      .from('whatsapp_integrations')
      .select('*')
      .eq('id', integration_id)
      .eq('user_id', user.id)
      .single();

    if (integrationError || !integration) {
      console.error('Integration not found or unauthorized:', integrationError);
      return new Response(
        JSON.stringify({ error: 'Integration not found or unauthorized' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Send message via WhatsApp API service
    const whatsappResponse = await fetch(
      `${supabaseUrl}/functions/v1/whatsapp-api-service`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          to: to,
          message: message,
          integration_id: integration_id,
        }),
      }
    );

    if (!whatsappResponse.ok) {
      console.error('Failed to send message via WhatsApp API:', await whatsappResponse.text());
      throw new Error('Failed to send message via WhatsApp API');
    }

    const whatsappResult = await whatsappResponse.json();
    console.log('WhatsApp API response:', whatsappResult);

    // Store the outbound message
    const { error: messageError } = await supabase
      .from('whatsapp_messages')
      .insert({
        integration_id,
        conversation_id,
        contact_phone: to,
        message_text: message,
        message_type: 'text',
        direction: 'outbound',
        whatsapp_message_id: n8nResult.message_id || null,
        status: 'sent',
      });

    if (messageError) {
      console.error('Error storing outbound message:', messageError);
    }

    // Update conversation with latest message if conversation_id provided
    if (conversation_id) {
      await supabase
        .from('conversations')
        .update({
          last_message: message,
          last_message_at: new Date().toISOString(),
        })
        .eq('id', conversation_id);
    }

    console.log('Message sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message_id: n8nResult.message_id,
        status: 'sent' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error sending message:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});