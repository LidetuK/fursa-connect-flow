import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { Conversation } from './conversation.entity';
import { Message } from '../messages/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message])],
  providers: [ConversationsService],
  controllers: [ConversationsController],
  exports: [ConversationsService],
})
export class ConversationsModule {}
