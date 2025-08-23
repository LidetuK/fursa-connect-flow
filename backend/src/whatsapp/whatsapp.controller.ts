import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('webhook')
  async handleWebhook(@Body() webhookData: any) {
    // This endpoint receives messages from your automation workflow
    try {
      const { from, message, messageType, mediaUrl, mediaType, whatsappMessageId, userId, senderName } = webhookData;
      
      const result = await this.whatsappService.handleIncomingMessage({
        from,
        message,
        messageType: messageType || 'text',
        mediaUrl,
        mediaType,
        whatsappMessageId,
        userId,
        senderName,
      });

      return { success: true, conversationId: result.conversation.id, messageId: result.message.id };
    } catch (error) {
      console.error('Webhook error:', error);
      return { success: false, error: error.message };
    }
  }

  @Post('send')
  @UseGuards(JwtAuthGuard)
  async sendMessage(@Body() messageData: any, @Request() req: any) {
    return this.whatsappService.sendMessage(
      messageData.to,
      messageData.message,
      messageData.templateId,
      messageData.businessProfile
    );
  }

  @Post('opt-in')
  async recordOptIn(@Body() optInData: any) {
    return this.whatsappService.recordOptIn(
      optInData.phoneNumber,
      optInData.method,
      optInData.categories
    );
  }

  @Post('opt-out')
  async handleOptOut(@Body() optOutData: any) {
    return this.whatsappService.handleOptOut(optOutData.phoneNumber);
  }

  @Get('templates')
  @UseGuards(JwtAuthGuard)
  async getMessageTemplates() {
    return this.whatsappService.getMessageTemplates();
  }

  @Post('bot-response')
  @UseGuards(JwtAuthGuard)
  async sendBotResponse(@Body() responseData: any, @Request() req: any) {
    return this.whatsappService.sendBotResponse(
      responseData.conversationId,
      responseData.response,
      req.user.id
    );
  }

  @Post('update-score/:conversationId')
  @UseGuards(JwtAuthGuard)
  async updateScore(@Param('conversationId') conversationId: string, @Body() body: { score: number }) {
    return this.whatsappService.updateConversationScore(conversationId, body.score);
  }

  @Post('update-intent/:conversationId')
  @UseGuards(JwtAuthGuard)
  async updateIntent(@Param('conversationId') conversationId: string, @Body() body: { intent: string }) {
    return this.whatsappService.updateConversationIntent(conversationId, body.intent);
  }
}
