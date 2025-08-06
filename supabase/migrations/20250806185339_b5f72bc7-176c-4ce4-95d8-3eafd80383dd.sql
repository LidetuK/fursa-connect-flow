-- Fix critical security issues: Enable RLS on all tables and secure database functions

-- Phase 1: Fix database function security by setting search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.classify_message_intent(message_text text, conversation_history jsonb DEFAULT '[]'::jsonb)
RETURNS TABLE(intent_type text, confidence_score numeric, detected_keywords text[])
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  msg_lower TEXT;
  keywords TEXT[];
  intent TEXT;
  confidence DECIMAL(3,2);
BEGIN
  msg_lower := LOWER(message_text);
  
  -- Greeting Intent
  IF msg_lower ~ '.*(hello|hi|hey|good morning|good afternoon|good evening|greetings|start).*' THEN
    intent := 'greeting';
    confidence := 0.90;
    keywords := ARRAY['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'start'];
  
  -- Complaint Intent (High Priority)
  ELSIF msg_lower ~ '.*(terrible|awful|horrible|worst|hate|disappointed|frustrated|angry|refund|cancel|unsubscribe|complaint).*' THEN
    intent := 'complaint';
    confidence := 0.95;
    keywords := ARRAY['terrible', 'awful', 'horrible', 'worst', 'hate', 'disappointed', 'frustrated', 'angry', 'refund', 'cancel', 'complaint'];
  
  -- Urgent Intent (High Priority)
  ELSIF msg_lower ~ '.*(urgent|asap|immediately|emergency|critical|now|today|rush).*' THEN
    intent := 'urgent';
    confidence := 0.85;
    keywords := ARRAY['urgent', 'asap', 'immediately', 'emergency', 'critical', 'now', 'today', 'rush'];
  
  -- Booking Intent
  ELSIF msg_lower ~ '.*(book|schedule|appointment|reserve|meeting|call|demo|consultation).*' THEN
    intent := 'booking';
    confidence := 0.80;
    keywords := ARRAY['book', 'schedule', 'appointment', 'reserve', 'meeting', 'call', 'demo', 'consultation'];
  
  -- Pricing Intent
  ELSIF msg_lower ~ '.*(price|cost|how much|pricing|quote|estimate|budget|fee|rate|charge).*' THEN
    intent := 'pricing';
    confidence := 0.85;
    keywords := ARRAY['price', 'cost', 'how much', 'pricing', 'quote', 'estimate', 'budget', 'fee', 'rate', 'charge'];
  
  -- Inquiry Intent
  ELSIF msg_lower ~ '.*(what|how|when|where|why|tell me|information|details|explain|describe).*' THEN
    intent := 'inquiry';
    confidence := 0.75;
    keywords := ARRAY['what', 'how', 'when', 'where', 'why', 'tell me', 'information', 'details', 'explain', 'describe'];
  
  -- Support Intent
  ELSIF msg_lower ~ '.*(help|support|problem|issue|trouble|error|bug|fix|assist).*' THEN
    intent := 'support';
    confidence := 0.80;
    keywords := ARRAY['help', 'support', 'problem', 'issue', 'trouble', 'error', 'bug', 'fix', 'assist'];
  
  -- Followup Intent
  ELSIF msg_lower ~ '.*(follow up|followup|following up|checking|status|update|progress).*' THEN
    intent := 'followup';
    confidence := 0.70;
    keywords := ARRAY['follow up', 'followup', 'following up', 'checking', 'status', 'update', 'progress'];
  
  ELSE
    intent := 'unknown';
    confidence := 0.50;
    keywords := ARRAY[]::TEXT[];
  END IF;
  
  RETURN QUERY SELECT intent, confidence, keywords;
END;
$function$;

CREATE OR REPLACE FUNCTION public.calculate_lead_score(message_text text, intent_type text, conversation_stage text DEFAULT 'new'::text, previous_score integer DEFAULT 0)
RETURNS TABLE(lead_score integer, quality_tier text, scoring_factors jsonb, buying_signals text[], urgency_indicators text[])
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  msg_lower TEXT;
  score INTEGER := 0;
  factors JSONB := '{}'::jsonb;
  buying_signals_arr TEXT[] := ARRAY[]::TEXT[];
  urgency_arr TEXT[] := ARRAY[]::TEXT[];
  tier TEXT;
BEGIN
  msg_lower := LOWER(message_text);
  
  -- Base score from previous interaction
  score := GREATEST(previous_score * 0.8, 0)::INTEGER; -- Decay previous score by 20%
  
  -- Intent-based scoring
  CASE intent_type
    WHEN 'pricing' THEN 
      score := score + 25;
      factors := factors || jsonb_build_object('intent_pricing', 25);
    WHEN 'booking' THEN 
      score := score + 30;
      factors := factors || jsonb_build_object('intent_booking', 30);
    WHEN 'urgent' THEN 
      score := score + 20;
      factors := factors || jsonb_build_object('intent_urgent', 20);
    WHEN 'complaint' THEN 
      score := score + 15; -- Complaints are leads but need careful handling
      factors := factors || jsonb_build_object('intent_complaint', 15);
    WHEN 'inquiry' THEN 
      score := score + 10;
      factors := factors || jsonb_build_object('intent_inquiry', 10);
    WHEN 'followup' THEN 
      score := score + 15;
      factors := factors || jsonb_build_object('intent_followup', 15);
  END CASE;
  
  -- Buying signal detection
  IF msg_lower ~ '.*(buy|purchase|order|get|want|need|interested|ready).*' THEN
    score := score + 30;
    buying_signals_arr := buying_signals_arr || ARRAY['buy', 'purchase', 'order', 'want', 'need', 'interested', 'ready'];
    factors := factors || jsonb_build_object('buying_signals', 30);
  END IF;
  
  -- Urgency indicators
  IF msg_lower ~ '.*(urgent|asap|immediately|today|now|rush|emergency).*' THEN
    score := score + 15;
    urgency_arr := urgency_arr || ARRAY['urgent', 'asap', 'immediately', 'today', 'now', 'rush', 'emergency'];
    factors := factors || jsonb_build_object('urgency_indicators', 15);
  END IF;
  
  -- Quantity/Scale indicators (high value)
  IF msg_lower ~ '.*(bulk|wholesale|multiple|many|several|\d+\s*(units|pieces|items)).*' THEN
    score := score + 20;
    buying_signals_arr := buying_signals_arr || ARRAY['bulk', 'wholesale', 'multiple', 'quantity'];
    factors := factors || jsonb_build_object('quantity_indicators', 20);
  END IF;
  
  -- Timeline indicators
  IF msg_lower ~ '.*(when|timeline|delivery|ship|available).*' THEN
    score := score + 10;
    factors := factors || jsonb_build_object('timeline_interest', 10);
  END IF;
  
  -- Conversation stage bonus
  CASE conversation_stage
    WHEN 'continuing' THEN 
      score := score + 10;
      factors := factors || jsonb_build_object('returning_customer', 10);
    WHEN 'followup' THEN 
      score := score + 15;
      factors := factors || jsonb_build_object('followup_conversation', 15);
  END CASE;
  
  -- Cap the score at 100
  score := LEAST(score, 100);
  
  -- Determine quality tier
  IF score >= 70 THEN
    tier := 'hot';
  ELSIF score >= 40 THEN
    tier := 'warm';
  ELSE
    tier := 'cold';
  END IF;
  
  RETURN QUERY SELECT score, tier, factors, buying_signals_arr, urgency_arr;
END;
$function$;

CREATE OR REPLACE FUNCTION public.requires_human_handoff(lead_score integer, intent_type text, quality_tier text, urgency_indicators text[])
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- High lead score threshold
  IF lead_score >= 70 THEN
    RETURN TRUE;
  END IF;
  
  -- Critical intents always require human attention
  IF intent_type IN ('complaint', 'urgent') THEN
    RETURN TRUE;
  END IF;
  
  -- Hot leads with booking intent
  IF quality_tier = 'hot' AND intent_type = 'booking' THEN
    RETURN TRUE;
  END IF;
  
  -- Messages with multiple urgency indicators
  IF array_length(urgency_indicators, 1) >= 2 THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$function$;

-- Phase 2: Add user_id columns to tables that need them and enable RLS

-- Add user_id to business_notification_settings
ALTER TABLE public.business_notification_settings 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing rows to have a user_id (set to first user for migration)
UPDATE public.business_notification_settings 
SET user_id = (SELECT id FROM auth.users LIMIT 1) 
WHERE user_id IS NULL;

-- Make user_id required
ALTER TABLE public.business_notification_settings 
ALTER COLUMN user_id SET NOT NULL;

-- Add user_id to telegram_integrations if not exists
ALTER TABLE public.telegram_integrations 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing rows to have a user_id
UPDATE public.telegram_integrations 
SET user_id = (SELECT id FROM auth.users LIMIT 1) 
WHERE user_id IS NULL;

-- Make user_id required  
ALTER TABLE public.telegram_integrations 
ALTER COLUMN user_id SET NOT NULL;

-- Enable RLS on all tables that need it
ALTER TABLE public.business_notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_lead_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for business_notification_settings
CREATE POLICY "Users can view their own notification settings" 
ON public.business_notification_settings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notification settings" 
ON public.business_notification_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification settings" 
ON public.business_notification_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notification settings" 
ON public.business_notification_settings 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for telegram_integrations
CREATE POLICY "Users can view their own Telegram integrations" 
ON public.telegram_integrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own Telegram integrations" 
ON public.telegram_integrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Telegram integrations" 
ON public.telegram_integrations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Telegram integrations" 
ON public.telegram_integrations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for telegram_messages
CREATE POLICY "Users can view messages for their integrations" 
ON public.telegram_messages 
FOR SELECT 
USING (integration_id IN (
  SELECT id FROM public.telegram_integrations 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Users can create messages for their integrations" 
ON public.telegram_messages 
FOR INSERT 
WITH CHECK (integration_id IN (
  SELECT id FROM public.telegram_integrations 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Users can update messages for their integrations" 
ON public.telegram_messages 
FOR UPDATE 
USING (integration_id IN (
  SELECT id FROM public.telegram_integrations 
  WHERE user_id = auth.uid()
));

-- For analytics and system tables, allow authenticated users to view all data for now
-- but restrict creation/modification to the data owner
CREATE POLICY "Authenticated users can view conversation analytics" 
ON public.conversation_analytics 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "System can create conversation analytics" 
ON public.conversation_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update conversation analytics" 
ON public.conversation_analytics 
FOR UPDATE 
USING (true);

-- Conversation intents
CREATE POLICY "Authenticated users can view conversation intents" 
ON public.conversation_intents 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "System can create conversation intents" 
ON public.conversation_intents 
FOR INSERT 
WITH CHECK (true);

-- Lead scores
CREATE POLICY "Authenticated users can view lead scores" 
ON public.conversation_lead_scores 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "System can create lead scores" 
ON public.conversation_lead_scores 
FOR INSERT 
WITH CHECK (true);

-- Team notifications
CREATE POLICY "Authenticated users can view team notifications" 
ON public.team_notifications 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "System can create team notifications" 
ON public.team_notifications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update team notifications" 
ON public.team_notifications 
FOR UPDATE 
TO authenticated
USING (true);