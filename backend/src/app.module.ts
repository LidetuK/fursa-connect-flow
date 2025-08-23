import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';

// Entity imports
import { User } from './users/user.entity';
import { Conversation } from './conversations/conversation.entity';
import { Message } from './messages/message.entity';
import { Integration } from './integrations/integration.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Conversation, Message, Integration],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in development
      logging: process.env.NODE_ENV !== 'production',
      retryAttempts: 3,
      retryDelay: 3000,
      keepConnectionAlive: true,
    }),
    AuthModule,
    UsersModule,
    WhatsAppModule,
    ConversationsModule,
    MessagesModule,
  ],
})
export class AppModule {}
