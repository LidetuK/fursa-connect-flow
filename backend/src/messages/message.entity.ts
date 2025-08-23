import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Conversation } from '../conversations/conversation.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  sender: string; // 'user' or 'bot'

  @Column({ nullable: true })
  senderPhone?: string;

  @Column({ nullable: true })
  senderName?: string;

  @Column({ default: 'text' })
  messageType: 'text' | 'audio' | 'image' | 'document';

  @Column({ nullable: true })
  mediaUrl?: string;

  @Column({ nullable: true })
  mediaType?: string;

  @Column({ default: 'sent' })
  status: 'sent' | 'delivered' | 'read' | 'failed';

  @Column({ nullable: true })
  whatsappMessageId?: string;

  @Column({ nullable: true })
  metadata?: string; // JSON string for additional data

  @ManyToOne(() => Conversation, conversation => conversation.messages, { onDelete: 'CASCADE' })
  conversation: Conversation;

  @Column()
  conversationId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
