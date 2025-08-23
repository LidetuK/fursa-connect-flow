import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { Message } from '../messages/message.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
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
    return this.conversationsRepository.find({
      where: { userId: userId }, // Use explicit userId column
      relations: ['messages'],
      order: { lastMessageAt: 'DESC', createdAt: 'DESC' },
    });
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
