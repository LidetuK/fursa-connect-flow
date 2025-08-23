import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Message } from '../messages/message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  channel: string;

  @Column({ nullable: true })
  participantPhone?: string;

  @Column({ nullable: true })
  participantName?: string;

  @Column({ nullable: true })
  participantEmail?: string;

  @Column({ default: 0 })
  leadScore: number;

  @Column({ nullable: true })
  intent?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  tags?: string; // JSON string for tags

  @Column({ nullable: true })
  lastMessageAt?: Date;

  @Column({ nullable: true })
  lastMessageContent?: string;

  @Column({ nullable: true })
  whatsappConversationId?: string;

  @Column({ nullable: true })
  metadata?: string; // JSON string for additional data

  @Column({ nullable: true })
  userId: string; // Add explicit userId column (nullable for now)

  @ManyToOne(() => User, user => user.conversations)
  user: User;

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
