import { useState, useEffect, useCallback } from 'react';
import { conversationsApi, messagesApi } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  messageType: 'text' | 'audio' | 'image' | 'document';
  mediaUrl?: string;
  mediaType?: string;
  senderPhone?: string;
  senderName?: string;
}

export interface Conversation {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'closed';
  channel: string;
  participantPhone?: string;
  participantName?: string;
  participantEmail?: string;
  leadScore: number;
  intent?: string;
  category?: string;
  lastMessageAt?: Date;
  lastMessageContent?: string;
  whatsappConversationId?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationStats {
  total: number;
  active: number;
  pending: number;
  closed: number;
  averageScore: number;
  channels: Record<string, number>;
}

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState<ConversationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await conversationsApi.getAll();
      setConversations(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch conversations';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await conversationsApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch conversation stats:', err);
    }
  }, []);

  const fetchConversation = useCallback(async (id: string) => {
    try {
      const data = await conversationsApi.getById(id);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch conversation';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const fetchMessages = useCallback(async (conversationId: string) => {
    try {
      const data = await messagesApi.getByConversation(conversationId);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const updateConversationScore = useCallback(async (conversationId: string, score: number) => {
    try {
      const updatedConversation = await conversationsApi.updateScore(conversationId, score);
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, leadScore: score }
            : conv
        )
      );
      return updatedConversation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update conversation score';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const updateConversationIntent = useCallback(async (conversationId: string, intent: string) => {
    try {
      const updatedConversation = await conversationsApi.updateIntent(conversationId, intent);
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, intent }
            : conv
        )
      );
      return updatedConversation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update conversation intent';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  const createMessage = useCallback(async (messageData: {
    content: string;
    sender: 'user' | 'bot';
    conversationId: string;
    messageType?: 'text' | 'audio' | 'image' | 'document';
    mediaUrl?: string;
    mediaType?: string;
  }) => {
    try {
      const message = await messagesApi.create(messageData);
      
      // Update conversation's last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === messageData.conversationId 
            ? { 
                ...conv, 
                lastMessageAt: new Date(),
                lastMessageContent: messageData.content,
                messages: [...conv.messages, message]
              }
            : conv
        )
      );
      
      return message;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create message';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  useEffect(() => {
    fetchConversations();
    fetchStats();
  }, [fetchConversations, fetchStats]);

  return {
    conversations,
    stats,
    loading,
    error,
    fetchConversations,
    fetchStats,
    fetchConversation,
    fetchMessages,
    updateConversationScore,
    updateConversationIntent,
    createMessage,
  };
};
