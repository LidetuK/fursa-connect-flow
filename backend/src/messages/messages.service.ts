import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Conversation } from '../conversations/conversation.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
  ) {}

  async createMessage(messageData: {
    content: string;
    sender: string;
    conversationId: string;
    senderPhone?: string;
    senderName?: string;
    messageType?: 'text' | 'audio' | 'image' | 'document';
    mediaUrl?: string;
    mediaType?: string;
    whatsappMessageId?: string;
    metadata?: any;
  }): Promise<Message> {
    const message = this.messagesRepository.create(messageData);
    const savedMessage = await this.messagesRepository.save(message);

    // Update conversation's last message
    await this.conversationsRepository.update(
      { id: messageData.conversationId },
      {
        lastMessageAt: new Date(),
        lastMessageContent: messageData.content,
      }
    );

    return savedMessage;
  }

  async getMessagesByConversation(conversationId: string): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
    });
  }

  async updateMessageStatus(messageId: string, status: 'sent' | 'delivered' | 'read' | 'failed'): Promise<Message> {
    await this.messagesRepository.update({ id: messageId }, { status });
    return this.messagesRepository.findOne({ where: { id: messageId } });
  }

  async getMessageById(messageId: string): Promise<Message> {
    return this.messagesRepository.findOne({ where: { id: messageId } });
  }

  async deleteMessage(messageId: string): Promise<void> {
    await this.messagesRepository.delete({ id: messageId });
  }
}
