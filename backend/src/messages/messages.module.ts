import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './message.entity';
import { Conversation } from '../conversations/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
