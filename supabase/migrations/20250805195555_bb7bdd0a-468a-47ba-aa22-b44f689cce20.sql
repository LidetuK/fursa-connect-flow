-- Create WhatsApp integrations table
CREATE TABLE public.whatsapp_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  phone_number TEXT NOT NULL,
  phone_number_id TEXT,
  business_name TEXT,
  webhook_url TEXT,
  n8n_webhook_token TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'connected', 'disconnected', 'error')),
  connected_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, phone_number)
);

-- Create WhatsApp messages table
CREATE TABLE public.whatsapp_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  integration_id UUID NOT NULL REFERENCES public.whatsapp_integrations(id) ON DELETE CASCADE,
  conversation_id UUID,
  contact_phone TEXT NOT NULL,
  contact_name TEXT,
  message_text TEXT,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'document', 'audio', 'video')),
  media_url TEXT,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  whatsapp_message_id TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversation participants table to link WhatsApp to conversations
CREATE TABLE public.conversation_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  participant_type TEXT NOT NULL CHECK (participant_type IN ('whatsapp', 'email', 'chat', 'phone')),
  participant_identifier TEXT NOT NULL, -- phone number, email, etc.
  participant_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(conversation_id, participant_type, participant_identifier)
);

-- Create conversations table if it doesn't exist (for the existing mock data)
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'closed')),
  channel TEXT DEFAULT 'chat' CHECK (channel IN ('chat', 'whatsapp', 'email', 'phone')),
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.whatsapp_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for whatsapp_integrations
CREATE POLICY "Users can view their own WhatsApp integrations" 
ON public.whatsapp_integrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own WhatsApp integrations" 
ON public.whatsapp_integrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own WhatsApp integrations" 
ON public.whatsapp_integrations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own WhatsApp integrations" 
ON public.whatsapp_integrations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for whatsapp_messages
CREATE POLICY "Users can view WhatsApp messages for their integrations" 
ON public.whatsapp_messages 
FOR SELECT 
USING (
  integration_id IN (
    SELECT id FROM public.whatsapp_integrations WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can create WhatsApp messages for their integrations" 
ON public.whatsapp_messages 
FOR INSERT 
WITH CHECK (
  integration_id IN (
    SELECT id FROM public.whatsapp_integrations WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update WhatsApp messages for their integrations" 
ON public.whatsapp_messages 
FOR UPDATE 
USING (
  integration_id IN (
    SELECT id FROM public.whatsapp_integrations WHERE user_id = auth.uid()
  )
);

-- Create policies for conversation_participants
CREATE POLICY "Users can view conversation participants" 
ON public.conversation_participants 
FOR SELECT 
USING (true); -- Allow viewing all participants for now

CREATE POLICY "Users can create conversation participants" 
ON public.conversation_participants 
FOR INSERT 
WITH CHECK (true); -- Allow creating participants

-- Create policies for conversations
CREATE POLICY "Users can view all conversations" 
ON public.conversations 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create conversations" 
ON public.conversations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update conversations" 
ON public.conversations 
FOR UPDATE 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_whatsapp_messages_integration_id ON public.whatsapp_messages(integration_id);
CREATE INDEX idx_whatsapp_messages_contact_phone ON public.whatsapp_messages(contact_phone);
CREATE INDEX idx_whatsapp_messages_created_at ON public.whatsapp_messages(created_at DESC);
CREATE INDEX idx_conversation_participants_conversation_id ON public.conversation_participants(conversation_id);
CREATE INDEX idx_conversations_status ON public.conversations(status);
CREATE INDEX idx_conversations_channel ON public.conversations(channel);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_whatsapp_integrations_updated_at
  BEFORE UPDATE ON public.whatsapp_integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_whatsapp_messages_updated_at
  BEFORE UPDATE ON public.whatsapp_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();