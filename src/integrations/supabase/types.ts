export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      business_notification_settings: {
        Row: {
          business_id: string
          created_at: string
          email_notifications: boolean | null
          escalation_intents: string[] | null
          id: string
          integration_type: string | null
          lead_score_threshold: number | null
          notification_hours: Json | null
          slack_notifications: boolean | null
          slack_webhook_url: string | null
          team_members: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          email_notifications?: boolean | null
          escalation_intents?: string[] | null
          id?: string
          integration_type?: string | null
          lead_score_threshold?: number | null
          notification_hours?: Json | null
          slack_notifications?: boolean | null
          slack_webhook_url?: string | null
          team_members?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          email_notifications?: boolean | null
          escalation_intents?: string[] | null
          id?: string
          integration_type?: string | null
          lead_score_threshold?: number | null
          notification_hours?: Json | null
          slack_notifications?: boolean | null
          slack_webhook_url?: string | null
          team_members?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      conversation_analytics: {
        Row: {
          ai_responses: number | null
          avg_response_time: unknown | null
          conversation_id: string
          conversion_stage: string | null
          created_at: string
          customer_satisfaction_score: number | null
          final_lead_score: number | null
          human_handoff_at: string | null
          human_handoff_triggered: boolean | null
          human_responses: number | null
          id: string
          intent_distribution: Json | null
          message_source: string | null
          peak_lead_score: number | null
          requires_human_followup: boolean | null
          resolution_time: unknown | null
          total_messages: number | null
          updated_at: string
        }
        Insert: {
          ai_responses?: number | null
          avg_response_time?: unknown | null
          conversation_id: string
          conversion_stage?: string | null
          created_at?: string
          customer_satisfaction_score?: number | null
          final_lead_score?: number | null
          human_handoff_at?: string | null
          human_handoff_triggered?: boolean | null
          human_responses?: number | null
          id?: string
          intent_distribution?: Json | null
          message_source?: string | null
          peak_lead_score?: number | null
          requires_human_followup?: boolean | null
          resolution_time?: unknown | null
          total_messages?: number | null
          updated_at?: string
        }
        Update: {
          ai_responses?: number | null
          avg_response_time?: unknown | null
          conversation_id?: string
          conversion_stage?: string | null
          created_at?: string
          customer_satisfaction_score?: number | null
          final_lead_score?: number | null
          human_handoff_at?: string | null
          human_handoff_triggered?: boolean | null
          human_responses?: number | null
          id?: string
          intent_distribution?: Json | null
          message_source?: string | null
          peak_lead_score?: number | null
          requires_human_followup?: boolean | null
          resolution_time?: unknown | null
          total_messages?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_analytics_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: true
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_intents: {
        Row: {
          confidence_score: number | null
          conversation_id: string
          created_at: string
          detected_keywords: string[] | null
          id: string
          intent_type: string
          message_id: string | null
          message_source: string | null
          message_text: string
          updated_at: string
        }
        Insert: {
          confidence_score?: number | null
          conversation_id: string
          created_at?: string
          detected_keywords?: string[] | null
          id?: string
          intent_type: string
          message_id?: string | null
          message_source?: string | null
          message_text: string
          updated_at?: string
        }
        Update: {
          confidence_score?: number | null
          conversation_id?: string
          created_at?: string
          detected_keywords?: string[] | null
          id?: string
          intent_type?: string
          message_id?: string | null
          message_source?: string | null
          message_text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_intents_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_lead_scores: {
        Row: {
          buying_signals: string[] | null
          conversation_id: string
          created_at: string
          id: string
          lead_score: number | null
          message_id: string | null
          message_source: string | null
          previous_score: number | null
          quality_tier: string | null
          score_change: number | null
          scoring_factors: Json | null
          updated_at: string
          urgency_indicators: string[] | null
        }
        Insert: {
          buying_signals?: string[] | null
          conversation_id: string
          created_at?: string
          id?: string
          lead_score?: number | null
          message_id?: string | null
          message_source?: string | null
          previous_score?: number | null
          quality_tier?: string | null
          score_change?: number | null
          scoring_factors?: Json | null
          updated_at?: string
          urgency_indicators?: string[] | null
        }
        Update: {
          buying_signals?: string[] | null
          conversation_id?: string
          created_at?: string
          id?: string
          lead_score?: number | null
          message_id?: string | null
          message_source?: string | null
          previous_score?: number | null
          quality_tier?: string | null
          score_change?: number | null
          scoring_factors?: Json | null
          updated_at?: string
          urgency_indicators?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_lead_scores_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          participant_identifier: string
          participant_name: string | null
          participant_type: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          participant_identifier: string
          participant_name?: string | null
          participant_type: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          participant_identifier?: string
          participant_name?: string | null
          participant_type?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          channel: string | null
          created_at: string
          id: string
          last_message: string | null
          last_message_at: string | null
          score: number | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          channel?: string | null
          created_at?: string
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          score?: number | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          channel?: string | null
          created_at?: string
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          score?: number | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_notifications: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          conversation_id: string
          created_at: string
          customer_info: Json | null
          id: string
          intent_type: string | null
          lead_score: number | null
          message_context: Json | null
          message_source: string | null
          notification_channels: string[] | null
          notification_type: string
          priority: string | null
          sent_at: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          conversation_id: string
          created_at?: string
          customer_info?: Json | null
          id?: string
          intent_type?: string | null
          lead_score?: number | null
          message_context?: Json | null
          message_source?: string | null
          notification_channels?: string[] | null
          notification_type: string
          priority?: string | null
          sent_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          conversation_id?: string
          created_at?: string
          customer_info?: Json | null
          id?: string
          intent_type?: string | null
          lead_score?: number | null
          message_context?: Json | null
          message_source?: string | null
          notification_channels?: string[] | null
          notification_type?: string
          priority?: string | null
          sent_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_notifications_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_integrations: {
        Row: {
          bot_token: string
          bot_username: string | null
          business_name: string | null
          connected_at: string | null
          created_at: string
          id: string
          n8n_webhook_token: string | null
          status: string | null
          updated_at: string
          user_id: string
          webhook_url: string | null
        }
        Insert: {
          bot_token: string
          bot_username?: string | null
          business_name?: string | null
          connected_at?: string | null
          created_at?: string
          id?: string
          n8n_webhook_token?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
          webhook_url?: string | null
        }
        Update: {
          bot_token?: string
          bot_username?: string | null
          business_name?: string | null
          connected_at?: string | null
          created_at?: string
          id?: string
          n8n_webhook_token?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      telegram_messages: {
        Row: {
          chat_id: string
          conversation_id: string | null
          created_at: string
          direction: string
          first_name: string | null
          id: string
          integration_id: string
          last_name: string | null
          media_url: string | null
          message_text: string | null
          message_type: string | null
          reply_to_message_id: string | null
          status: string | null
          telegram_message_id: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          chat_id: string
          conversation_id?: string | null
          created_at?: string
          direction: string
          first_name?: string | null
          id?: string
          integration_id: string
          last_name?: string | null
          media_url?: string | null
          message_text?: string | null
          message_type?: string | null
          reply_to_message_id?: string | null
          status?: string | null
          telegram_message_id?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          chat_id?: string
          conversation_id?: string | null
          created_at?: string
          direction?: string
          first_name?: string | null
          id?: string
          integration_id?: string
          last_name?: string | null
          media_url?: string | null
          message_text?: string | null
          message_type?: string | null
          reply_to_message_id?: string | null
          status?: string | null
          telegram_message_id?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "telegram_messages_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "telegram_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_integrations: {
        Row: {
          business_name: string | null
          connected_at: string | null
          created_at: string
          id: string
          n8n_webhook_token: string | null
          phone_number: string
          status: string | null
          updated_at: string
          user_id: string
          webhook_url: string | null
        }
        Insert: {
          business_name?: string | null
          connected_at?: string | null
          created_at?: string
          id?: string
          n8n_webhook_token?: string | null
          phone_number: string
          status?: string | null
          updated_at?: string
          user_id: string
          webhook_url?: string | null
        }
        Update: {
          business_name?: string | null
          connected_at?: string | null
          created_at?: string
          id?: string
          n8n_webhook_token?: string | null
          phone_number?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      whatsapp_messages: {
        Row: {
          contact_name: string | null
          contact_phone: string
          conversation_id: string | null
          created_at: string
          direction: string
          id: string
          integration_id: string
          media_url: string | null
          message_text: string | null
          message_type: string | null
          status: string | null
          updated_at: string
          whatsapp_message_id: string | null
        }
        Insert: {
          contact_name?: string | null
          contact_phone: string
          conversation_id?: string | null
          created_at?: string
          direction: string
          id?: string
          integration_id: string
          media_url?: string | null
          message_text?: string | null
          message_type?: string | null
          status?: string | null
          updated_at?: string
          whatsapp_message_id?: string | null
        }
        Update: {
          contact_name?: string | null
          contact_phone?: string
          conversation_id?: string | null
          created_at?: string
          direction?: string
          id?: string
          integration_id?: string
          media_url?: string | null
          message_text?: string | null
          message_type?: string | null
          status?: string | null
          updated_at?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_messages_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_lead_score: {
        Args: {
          message_text: string
          intent_type: string
          conversation_stage?: string
          previous_score?: number
        }
        Returns: {
          lead_score: number
          quality_tier: string
          scoring_factors: Json
          buying_signals: string[]
          urgency_indicators: string[]
        }[]
      }
      classify_message_intent: {
        Args: { message_text: string; conversation_history?: Json }
        Returns: {
          intent_type: string
          confidence_score: number
          detected_keywords: string[]
        }[]
      }
      requires_human_handoff: {
        Args: {
          lead_score: number
          intent_type: string
          quality_tier: string
          urgency_indicators: string[]
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
