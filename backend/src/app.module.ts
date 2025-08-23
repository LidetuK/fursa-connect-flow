import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { User } from './users/user.entity';
import { Conversation } from './conversations/conversation.entity';
import { Message } from './messages/message.entity';
import { Integration } from './integrations/integration.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:IAMSYYGKEhzgSZqtSBHwXmwsSmXzOrmc@yamanote.proxy.rlwy.net:47172/railway',
      entities: [User, Conversation, Message, Integration],
      synchronize: true, // Be careful with this in production
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
    AuthModule,
    ConversationsModule,
    MessagesModule,
    WhatsAppModule,
  ],
})
export class AppModule {}
