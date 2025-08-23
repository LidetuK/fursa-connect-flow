import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('conversations')
@UseGuards(JwtAuthGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  async getConversations(@Request() req: any) {
    return this.conversationsService.getConversationsByUser(req.user.id);
  }

  @Get('stats')
  async getConversationStats(@Request() req: any) {
    return this.conversationsService.getConversationStats(req.user.id);
  }

  @Get(':id')
  async getConversation(@Param('id') conversationId: string, @Request() req: any) {
    return this.conversationsService.getConversationById(conversationId, req.user.id);
  }

  @Post()
  async createConversation(@Body() conversationData: any, @Request() req: any) {
    return this.conversationsService.createConversation({
      ...conversationData,
      userId: req.user.id,
    });
  }

  @Put(':id')
  async updateConversation(
    @Param('id') conversationId: string,
    @Body() updateData: any,
    @Request() req: any
  ) {
    // Ensure the conversation belongs to the authenticated user
    const conversation = await this.conversationsService.getConversationById(conversationId, req.user.id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return this.conversationsService.updateConversation(conversationId, updateData);
  }

  @Put(':id/score')
  async updateLeadScore(
    @Param('id') conversationId: string,
    @Body() body: { score: number },
    @Request() req: any
  ) {
    const conversation = await this.conversationsService.getConversationById(conversationId, req.user.id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return this.conversationsService.updateLeadScore(conversationId, body.score);
  }

  @Put(':id/intent')
  async updateIntent(
    @Param('id') conversationId: string,
    @Body() body: { intent: string },
    @Request() req: any
  ) {
    const conversation = await this.conversationsService.getConversationById(conversationId, req.user.id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return this.conversationsService.updateIntent(conversationId, body.intent);
  }

  @Delete(':id')
  async deleteConversation(@Param('id') conversationId: string, @Request() req: any) {
    const conversation = await this.conversationsService.getConversationById(conversationId, req.user.id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return this.conversationsService.deleteConversation(conversationId);
  }
}
