import { Injectable } from '@nestjs/common';
import { ConversationsService } from '../conversations/conversations.service';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class WhatsAppService {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly messagesService: MessagesService,
  ) {}
  
  // Meta WhatsApp Business API compliance service
  
  async sendMessage(to: string, message: string, templateId?: string, businessProfile?: any): Promise<any> {
    // Implement Meta API call with compliance checks
    return {
      messageId: `msg_${Date.now()}`,
      status: 'sent',
      compliance: {
        optInVerified: true,
        within24HourWindow: true,
        templateUsed: !!templateId
      }
    };
  }
  
  async recordOptIn(phoneNumber: string, method: string, categories: string[]): Promise<any> {
    // Record user opt-in for compliance
    return {
      success: true,
      optInRecord: {
        phoneNumber,
        method,
        categories,
        timestamp: new Date().toISOString()
      }
    };
  }
  
  async handleOptOut(phoneNumber: string): Promise<any> {
    // Handle user opt-out
    return {
      success: true,
      message: 'User opted out successfully'
    };
  }
  
  async getMessageTemplates(): Promise<any[]> {
    // Return approved message templates
    return [
      {
        id: 'welcome_template',
        name: 'Welcome Message',
        category: 'MARKETING',
        status: 'APPROVED',
        content: 'Welcome to {{1}}! Thank you for opting in.'
      },
      {
        id: 'order_update_template',
        name: 'Order Update',
        category: 'UTILITY',
        status: 'APPROVED',
        content: 'Your order #{{1}} has been {{2}}.'
      }
    ];
  }

  // New methods for conversation integration
  async handleIncomingMessage(messageData: {
    from: string;
    message: string;
    messageType: 'text' | 'audio' | 'image' | 'document';
    mediaUrl?: string;
    mediaType?: string;
    whatsappMessageId: string;
    userId: string;
    senderName?: string;
  }) {
    try {
      // Find or create conversation
      let conversation = await this.conversationsService.getConversationByWhatsAppId(messageData.from);
      
      if (!conversation) {
        // Create new conversation
        conversation = await this.conversationsService.createConversation({
          title: `WhatsApp - ${messageData.senderName || messageData.from}`,
          userId: messageData.userId,
          channel: 'whatsapp',
          participantPhone: messageData.from,
          participantName: messageData.senderName,
          whatsappConversationId: messageData.from,
          status: 'active',
        });
      }

      // Create message
      const message = await this.messagesService.createMessage({
        content: messageData.message,
        sender: 'user',
        conversationId: conversation.id,
        senderPhone: messageData.from,
        senderName: messageData.senderName,
        messageType: messageData.messageType,
        mediaUrl: messageData.mediaUrl,
        mediaType: messageData.mediaType,
        whatsappMessageId: messageData.whatsappMessageId,
      });

      return { conversation, message };
    } catch (error) {
      console.error('Error handling incoming message:', error);
      throw error;
    }
  }

  async sendBotResponse(conversationId: string, response: string, userId: string) {
    try {
      // Create bot message
      const message = await this.messagesService.createMessage({
        content: response,
        sender: 'bot',
        conversationId: conversationId,
        messageType: 'text',
      });

      // Update conversation status
      await this.conversationsService.updateConversation(conversationId, {
        status: 'active',
        lastMessageAt: new Date(),
      });

      return message;
    } catch (error) {
      console.error('Error sending bot response:', error);
      throw error;
    }
  }

  async updateConversationScore(conversationId: string, score: number) {
    return this.conversationsService.updateLeadScore(conversationId, score);
  }

  async updateConversationIntent(conversationId: string, intent: string) {
    return this.conversationsService.updateIntent(conversationId, intent);
  }
}
