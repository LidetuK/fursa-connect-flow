import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() messageData: any, @Request() req: any) {
    // Ensure the conversation belongs to the authenticated user
    return this.messagesService.createMessage({
      ...messageData,
      userId: req.user.id,
    });
  }

  @Get('conversation/:conversationId')
  async getMessagesByConversation(@Param('conversationId') conversationId: string) {
    return this.messagesService.getMessagesByConversation(conversationId);
  }

  @Put(':id/status')
  async updateMessageStatus(
    @Param('id') messageId: string,
    @Body() body: { status: 'sent' | 'delivered' | 'read' | 'failed' }
  ) {
    return this.messagesService.updateMessageStatus(messageId, body.status);
  }

  @Get(':id')
  async getMessage(@Param('id') messageId: string) {
    return this.messagesService.getMessageById(messageId);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') messageId: string) {
    return this.messagesService.deleteMessage(messageId);
  }
}
