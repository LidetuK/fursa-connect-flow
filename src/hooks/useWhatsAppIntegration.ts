import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppIntegration {
  id: string;
  phone_number: string;
  business_name?: string;
  webhook_url?: string;
  status: 'pending' | 'connected' | 'disconnected' | 'error';
  connected_at?: string;
}

interface WhatsAppMessage {
  id: string;
  contact_phone: string;
  contact_name?: string;
  message_text?: string;
  message_type: 'text' | 'image' | 'document' | 'audio' | 'video';
  direction: 'inbound' | 'outbound';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  created_at: string;
}

export const useWhatsAppIntegration = () => {
  const [integrations, setIntegrations] = useState<WhatsAppIntegration[]>([]);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch integrations
  const fetchIntegrations = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIntegrations((data || []) as WhatsAppIntegration[]);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch WhatsApp integrations",
        variant: "destructive",
      });
    }
  };

  // Fetch messages for a specific integration
  const fetchMessages = async (integrationId: string) => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .eq('integration_id', integrationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as WhatsAppMessage[]);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch WhatsApp messages",
        variant: "destructive",
      });
    }
  };

  // Create new integration
  const createIntegration = async (phoneNumber: string, businessName?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const webhookToken = crypto.randomUUID();
      const webhookUrl = `https://azuqquiicdtmgkyeseub.supabase.co/functions/v1/whatsapp-webhook-receiver`;

      const { data, error } = await supabase
        .from('whatsapp_integrations')
        .insert({
          user_id: user.id,
          phone_number: phoneNumber,
          business_name: businessName,
          webhook_url: webhookUrl,
          n8n_webhook_token: webhookToken,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "WhatsApp integration created. Configure your n8n workflow with the provided webhook URL.",
      });

      await fetchIntegrations();
      return data;
    } catch (error) {
      console.error('Error creating integration:', error);
      toast({
        title: "Error",
        description: "Failed to create WhatsApp integration",
        variant: "destructive",
      });
    }
  };

  // Send message
  const sendMessage = async (integrationId: string, to: string, message: string, conversationId?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('User not authenticated');

      const response = await supabase.functions.invoke('whatsapp-message-sender', {
        body: {
          integration_id: integrationId,
          to: to,
          message: message,
          conversation_id: conversationId
        }
      });

      if (response.error) throw response.error;

      toast({
        title: "Success",
        description: "Message sent successfully",
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send WhatsApp message",
        variant: "destructive",
      });
    }
  };

  // Update integration status
  const updateIntegrationStatus = async (integrationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('whatsapp_integrations')
        .update({ 
          status: status as any,
          connected_at: status === 'connected' ? new Date().toISOString() : null
        })
        .eq('id', integrationId);

      if (error) throw error;
      await fetchIntegrations();
    } catch (error) {
      console.error('Error updating integration status:', error);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    fetchIntegrations();

    // Subscribe to integration changes
    const integrationChannel = supabase
      .channel('whatsapp_integrations_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'whatsapp_integrations'
      }, () => {
        fetchIntegrations();
      })
      .subscribe();

    // Subscribe to message changes
    const messageChannel = supabase
      .channel('whatsapp_messages_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'whatsapp_messages'
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as WhatsAppMessage]);
      })
      .subscribe();

    setLoading(false);

    return () => {
      supabase.removeChannel(integrationChannel);
      supabase.removeChannel(messageChannel);
    };
  }, []);

  return {
    integrations,
    messages,
    loading,
    createIntegration,
    sendMessage,
    updateIntegrationStatus,
    fetchMessages,
    fetchIntegrations
  };
};