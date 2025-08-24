import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Conversation } from './conversation.entity';
import { Message } from '../messages/message.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    private dataSource: DataSource,
  ) {}

  async createConversation(conversationData: {
    title: string;
    userId: string;
    channel: string;
    status?: string;
    participantPhone?: string;
    participantName?: string;
    participantEmail?: string;
    whatsappConversationId?: string;
    metadata?: any;
  }): Promise<Conversation> {
    const conversation = this.conversationsRepository.create({
      ...conversationData,
      user: { id: conversationData.userId } // Establish the relationship properly
    });
    return this.conversationsRepository.save(conversation);
  }

  async getConversationsByUser(userId: string): Promise<Conversation[]> {
    // Get regular conversations
    const regularConversations = await this.conversationsRepository.find({
      where: { userId: userId },
      relations: ['messages'],
      order: { lastMessageAt: 'DESC', createdAt: 'DESC' },
    });

    // Get n8n conversations from chat_histories table
    const n8nConversations = await this.getN8nConversations(userId);

    // Combine and sort all conversations
    const allConversations = [...regularConversations, ...n8nConversations];
    return allConversations.sort((a, b) => {
      const dateA = a.lastMessageAt || a.createdAt;
      const dateB = b.lastMessageAt || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }

  async getN8nConversations(userId: string): Promise<Conversation[]> {
    try {
      // Query the n8n_chat_histories table directly
      const query = `
        SELECT 
          session_id as "participantPhone",
          MAX(id) as "lastMessageId",
          COUNT(*) as message_count
        FROM n8n_chat_histories 
        GROUP BY session_id 
        ORDER BY MAX(id) DESC
      `;
      
      const n8nData = await this.dataSource.query(query);
      
      // Convert to Conversation format
      return n8nData.map((row: any) => {
        const conversation = new Conversation();
        conversation.id = `n8n_${row.participantPhone}`; // Generate unique ID
        conversation.title = `WhatsApp Chat - ${row.participantPhone}`;
        conversation.status = 'active';
        conversation.channel = 'whatsapp';
        conversation.participantPhone = row.participantPhone;
        conversation.participantName = `User ${row.participantPhone}`;
        conversation.leadScore = 0;
        conversation.lastMessageAt = new Date(); // Use current date since no timestamp column
        conversation.lastMessageContent = `Last message from ${row.participantPhone}`;
        conversation.userId = userId;
        conversation.createdAt = new Date();
        conversation.updatedAt = new Date();
        conversation.messages = []; // Will be populated separately if needed
        return conversation;
      });
    } catch (error) {
      console.error('Error fetching n8n conversations:', error);
      return [];
    }
  }

  async getN8nMessages(sessionId: string): Promise<Message[]> {
    try {
      const query = `
        SELECT 
          id,
          session_id,
          message
        FROM n8n_chat_histories 
        WHERE session_id = $1 
        ORDER BY id ASC
      `;
      
      const n8nMessages = await this.dataSource.query(query, [sessionId]);
      
      return n8nMessages.map((row: any) => {
        // Parse the JSON message to extract content and type
        let messageContent = '';
        let messageType = 'text';
        let sender = 'user';
        
        try {
          const messageData = JSON.parse(row.message);
          messageContent = messageData.content || 'No content';
          messageType = messageData.type === 'human' ? 'user' : 'bot';
          sender = messageData.type === 'human' ? 'user' : 'bot';
        } catch (e) {
          messageContent = row.message || 'Invalid message format';
        }
        
        const message = new Message();
        message.id = `n8n_${row.id}`;
        message.content = messageContent;
        message.sender = sender;
        message.messageType = 'text';
        message.status = 'delivered';
        message.createdAt = new Date(); // Use current date since no timestamp column
        message.updatedAt = new Date();
        return message;
      });
    } catch (error) {
      console.error('Error fetching n8n messages:', error);
      return [];
    }
  }

  async debugN8nTable() {
    try {
      // First, let's check the table structure
      const structureQuery = `
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'n8n_chat_histories' 
        ORDER BY ordinal_position
      `;
      
      const tableStructure = await this.dataSource.query(structureQuery);
      
      // Now query with the correct column names
      const query = `
        SELECT 
          id,
          session_id,
          message
        FROM n8n_chat_histories 
        ORDER BY id DESC
        LIMIT 10
      `;
      
      const n8nData = await this.dataSource.query(query);
      
      // Parse the JSON messages to show content
      const parsedData = n8nData.map((row: any) => {
        let parsedMessage = null;
        try {
          parsedMessage = JSON.parse(row.message);
        } catch (e) {
          parsedMessage = { error: 'Invalid JSON', raw: row.message };
        }
        
        return {
          id: row.id,
          session_id: row.session_id,
          message_type: parsedMessage?.type || 'unknown',
          content: parsedMessage?.content || 'No content',
          raw_message: row.message
        };
      });
      
      return {
        tableName: 'n8n_chat_histories',
        tableStructure: tableStructure,
        totalRecords: n8nData.length,
        data: parsedData,
        sampleRecord: parsedData[0] || null,
        uniqueSessions: [...new Set(n8nData.map((row: any) => row.session_id))]
      };
    } catch (error) {
      console.error('Error debugging n8n table:', error);
      return {
        error: error.message,
        tableName: 'n8n_chat_histories'
      };
    }
  }

  async getConversationById(conversationId: string, userId: string): Promise<Conversation> {
    return this.conversationsRepository.findOne({
      where: { id: conversationId, userId: userId }, // Use explicit userId column
      relations: ['messages'],
    });
  }

  async updateConversation(conversationId: string, updateData: Partial<Conversation>): Promise<Conversation> {
    await this.conversationsRepository.update({ id: conversationId }, updateData);
    return this.conversationsRepository.findOne({ where: { id: conversationId } });
  }

  async updateLeadScore(conversationId: string, score: number): Promise<Conversation> {
    await this.conversationsRepository.update({ id: conversationId }, { leadScore: score });
    return this.conversationsRepository.findOne({ where: { id: conversationId } });
  }

  async updateIntent(conversationId: string, intent: string): Promise<Conversation> {
    await this.conversationsRepository.update({ id: conversationId }, { intent });
    return this.conversationsRepository.findOne({ where: { id: conversationId } });
  }

  async getConversationByWhatsAppId(whatsappConversationId: string): Promise<Conversation> {
    return this.conversationsRepository.findOne({
      where: { whatsappConversationId },
      relations: ['messages'],
    });
  }

  async deleteConversation(conversationId: string): Promise<void> {
    await this.conversationsRepository.delete({ id: conversationId });
  }

  async getConversationStats(userId: string) {
    const conversations = await this.getConversationsByUser(userId);
    
    const stats = {
      total: conversations.length,
      active: conversations.filter(c => c.status === 'active').length,
      pending: conversations.filter(c => c.status === 'pending').length,
      closed: conversations.filter(c => c.status === 'closed').length,
      averageScore: conversations.reduce((acc, c) => acc + c.leadScore, 0) / conversations.length || 0,
      channels: conversations.reduce((acc, c) => {
        acc[c.channel] = (acc[c.channel] || 0) + 1;
        return acc;
      }, {}),
    };

    return stats;
  }
}
