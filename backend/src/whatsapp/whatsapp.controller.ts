import { Controller, Post, Get, Body, HttpException, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Meta WhatsApp Business API compliant controller
@Controller('whatsapp')
export class WhatsAppController {
  
  // Send message with compliance checks
  @Post('send-message')
  @UseGuards(JwtAuthGuard)
  async sendMessage(@Body() body: any, @Request() req: any) {
    try {
      const { to, message, templateId, businessProfile, complianceSettings } = body;
      
      // 1. Check if user has opted in (Meta requirement)
      const hasOptIn = await this.checkOptInStatus(to);
      if (!hasOptIn) {
        throw new HttpException('User has not opted in to receive messages', HttpStatus.BAD_REQUEST);
      }
      
      // 2. Check 24-hour window (Meta requirement)
      const lastUserMessage = await this.getLastUserMessage(to);
      const within24Hours = this.isWithin24Hours(lastUserMessage?.timestamp);
      
      if (!within24Hours && !templateId) {
        throw new HttpException(
          'Cannot send free-form message outside 24-hour window. Use approved message template.',
          HttpStatus.BAD_REQUEST
        );
      }
      
      // 3. Validate business profile (Meta requirement)
      if (!this.validateBusinessProfile(businessProfile)) {
        throw new HttpException('Invalid business profile', HttpStatus.BAD_REQUEST);
      }
      
      // 4. Check for prohibited content (Meta requirement)
      if (this.containsProhibitedContent(message)) {
        throw new HttpException('Message contains prohibited content', HttpStatus.BAD_REQUEST);
      }
      
      // 5. Send message via Meta API
      const result = await this.sendViaMetaAPI(to, message, templateId);
      
      // 6. Log for compliance
      await this.logMessageForCompliance({
        to,
        message,
        templateId,
        businessProfile,
        userId: req.user.id,
        timestamp: new Date().toISOString()
      });
      
      return {
        success: true,
        messageId: result.messageId,
        compliance: {
          optInVerified: true,
          within24HourWindow: within24Hours,
          templateUsed: !!templateId,
          businessProfileValid: true
        }
      };
      
    } catch (error) {
      console.error('WhatsApp send message error:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  // Record user opt-in (Meta requirement)
  @Post('opt-in')
  @UseGuards(JwtAuthGuard)
  async recordOptIn(@Body() body: any) {
    try {
      const { phoneNumber, method, categories, ipAddress, userAgent } = body;
      
      // Validate opt-in data
      if (!phoneNumber || !method || !categories) {
        throw new HttpException('Missing required opt-in information', HttpStatus.BAD_REQUEST);
      }
      
      // Store opt-in record
      const optInRecord = {
        phoneNumber,
        method,
        categories,
        ipAddress,
        userAgent,
        timestamp: new Date().toISOString(),
        verified: true
      };
      
      // Save to database (implement your database logic here)
      // await this.whatsappService.saveOptIn(optInRecord);
      
      return {
        success: true,
        message: 'Opt-in recorded successfully',
        optInRecord
      };
      
    } catch (error) {
      console.error('Opt-in recording error:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  // Handle opt-out (Meta requirement)
  @Post('opt-out')
  @UseGuards(JwtAuthGuard)
  async handleOptOut(@Body() body: any) {
    try {
      const { phoneNumber } = body;
      
      if (!phoneNumber) {
        throw new HttpException('Phone number is required', HttpStatus.BAD_REQUEST);
      }
      
      // Remove from opt-in records
      // await this.whatsappService.removeOptIn(phoneNumber);
      
      // Stop all future messages to this number
      // await this.whatsappService.blockMessages(phoneNumber);
      
      return {
        success: true,
        message: 'User opted out successfully'
      };
      
    } catch (error) {
      console.error('Opt-out error:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  // Get message templates (Meta requirement)
  @Get('templates')
  @UseGuards(JwtAuthGuard)
  async getMessageTemplates() {
    try {
      // Return approved message templates
      const templates = [
        {
          id: 'welcome_template',
          name: 'Welcome Message',
          category: 'MARKETING',
          language: 'en_US',
          status: 'APPROVED',
          content: 'Welcome to {{1}}! Thank you for opting in to receive updates from us. Reply STOP to unsubscribe.',
          variables: ['business_name']
        },
        {
          id: 'order_update_template',
          name: 'Order Update',
          category: 'UTILITY',
          language: 'en_US',
          status: 'APPROVED',
          content: 'Your order #{{1}} has been {{2}}. Track your order at {{3}}.',
          variables: ['order_number', 'status', 'tracking_url']
        },
        {
          id: 'support_template',
          name: 'Customer Support',
          category: 'UTILITY',
          language: 'en_US',
          status: 'APPROVED',
          content: 'Thank you for contacting {{1}} support. A representative will respond within 24 hours. For urgent matters, call {{2}}.',
          variables: ['business_name', 'support_phone']
        }
      ];
      
      return {
        success: true,
        templates
      };
      
    } catch (error) {
      console.error('Get templates error:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  // Helper methods for compliance
  private async checkOptInStatus(phoneNumber: string): Promise<boolean> {
    // Implement your opt-in checking logic
    // This should check your database for opt-in records
    return true; // Placeholder
  }
  
  private async getLastUserMessage(phoneNumber: string): Promise<any> {
    // Implement logic to get last user message timestamp
    return null; // Placeholder
  }
  
  private isWithin24Hours(timestamp: string): boolean {
    if (!timestamp) return false;
    const lastMessage = new Date(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - lastMessage.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24;
  }
  
  private validateBusinessProfile(profile: any): boolean {
    // Validate business profile requirements
    return profile && 
           profile.name && 
           profile.email && 
           profile.website && 
           profile.phone;
  }
  
  private containsProhibitedContent(message: string): boolean {
    const prohibitedKeywords = [
      'gambling', 'casino', 'bet', 'lottery', 'poker',
      'adult', 'porn', 'sex', 'dating',
      'drugs', 'marijuana', 'cocaine',
      'firearms', 'weapons', 'guns',
      'alcohol', 'beer', 'wine', 'liquor'
    ];
    
    const lowerMessage = message.toLowerCase();
    return prohibitedKeywords.some(keyword => lowerMessage.includes(keyword));
  }
  
  private async sendViaMetaAPI(to: string, message: string, templateId?: string): Promise<any> {
    // Implement Meta WhatsApp Business API call
    // This is where you'd make the actual API call to Meta
    return {
      messageId: `msg_${Date.now()}`,
      status: 'sent'
    };
  }
  
  private async logMessageForCompliance(data: any): Promise<void> {
    // Log message for compliance and audit purposes
    console.log('Compliance log:', data);
  }
}
