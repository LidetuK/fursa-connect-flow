import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SendMessageRequest {
  to: string;
  message: string;
  integration_id: string;
  provider?: 'twilio' | '360dialog';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { to, message, integration_id, provider = 'twilio' }: SendMessageRequest = await req.json();

    // Get integration details
    const { data: integration, error: integrationError } = await supabase
      .from('whatsapp_integrations')
      .select('*')
      .eq('id', integration_id)
      .single();

    if (integrationError || !integration) {
      throw new Error('Integration not found');
    }

    let result: any;

    if (provider === 'twilio') {
      // Twilio credentials
      const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID')!;
      const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN')!;
      const twilioWhatsAppNumber = Deno.env.get('TWILIO_WHATSAPP_NUMBER')!;
      
      // Format phone number for Twilio WhatsApp
      const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
      const formattedFrom = twilioWhatsAppNumber;

      // Send message via Twilio WhatsApp API
      const twilioResponse = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            From: formattedFrom,
            To: formattedTo,
            Body: message
          })
        }
      );

      if (!twilioResponse.ok) {
        const errorText = await twilioResponse.text();
        console.error('Twilio API error:', errorText);
        throw new Error(`Twilio API error: ${errorText}`);
      }

      result = await twilioResponse.json();

    } else if (provider === '360dialog') {
      // 360dialog credentials
      const dialog360ApiKey = Deno.env.get('DIALOG360_API_KEY')!;
      const dialog360PhoneNumberId = integration.phone_number_id || Deno.env.get('DIALOG360_PHONE_NUMBER_ID')!;
      
      if (!dialog360PhoneNumberId) {
        throw new Error('360dialog phone number ID not found');
      }

      // Send message via 360dialog WhatsApp API
      const dialog360Response = await fetch(
        `https://waba-v2.360dialog.io/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${dialog360ApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipient_type: 'individual',
            to: to,
            type: 'text',
            text: {
              body: message
            }
          })
        }
      );

      if (!dialog360Response.ok) {
        const errorText = await dialog360Response.text();
        console.error('360dialog API error:', errorText);
        throw new Error(`360dialog API error: ${errorText}`);
      }

      result = await dialog360Response.json();
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    console.log(`${provider} API response:`, result);

    return new Response(
      JSON.stringify({
        success: true,
        message_id: result.sid || result.messages?.[0]?.id,
        status: result.status || 'sent',
        provider: provider
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in WhatsApp API service:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
}) 