# WhatsApp Business API + n8n Integration Setup Guide

## Overview
This guide will help you set up WhatsApp Business API integration with n8n for automatic message handling and replies.

## Prerequisites
1. WhatsApp Business API account
2. n8n instance (cloud or self-hosted)
3. Supabase project with the provided functions

## Step 1: WhatsApp Business API Setup

### 1.1 Get WhatsApp Business API Credentials
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new app or use existing one
3. Add WhatsApp Business API product
4. Get your credentials:
   - **Access Token**
   - **Phone Number ID**
   - **Business Account ID**

### 1.2 Configure Webhook
1. In your WhatsApp Business API dashboard, set the webhook URL to:
   ```
   https://your-project.supabase.co/functions/v1/whatsapp-webhook-receiver
   ```
2. Verify the webhook with the provided token

## Step 2: Environment Variables Setup

Add these environment variables to your Supabase project:

```bash
# WhatsApp Business API
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here

# n8n Configuration
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/whatsapp-webhook
```

## Step 3: n8n Workflow Setup

### 3.1 Import the Workflow
1. Open your n8n instance
2. Import the `n8n-workflow-whatsapp-autoreply.json` file
3. Update the webhook URL in the workflow to match your n8n instance

### 3.2 Configure Environment Variables in n8n
Add these variables to your n8n environment:
```
WHATSAPP_API_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

### 3.3 Activate the Workflow
1. Save the workflow
2. Activate it to start receiving webhooks

## Step 4: Database Migration

Run the database migration to add the `phone_number_id` field:

```sql
-- Add phone_number_id column to whatsapp_integrations table
ALTER TABLE public.whatsapp_integrations 
ADD COLUMN phone_number_id TEXT;
```

## Step 5: Deploy Supabase Functions

Deploy the new functions to your Supabase project:

```bash
supabase functions deploy whatsapp-api-service
supabase functions deploy n8n-bridge
```

## Step 6: Test the Integration

### 6.1 Create WhatsApp Integration
1. Go to your dashboard Settings → Integrations
2. Click "Connect WhatsApp"
3. Enter your business phone number
4. The system will create an integration record

### 6.2 Test Auto-Reply
Send these test messages to your WhatsApp number:
- "hello" → Should get greeting response
- "pricing" → Should get pricing information
- "help" → Should get help information
- Any other message → Should get default response

## Step 7: Monitor Conversations

### 7.1 Check Dashboard
- Go to Conversations page to see real WhatsApp conversations
- Messages will appear with contact names and timestamps
- Auto-replies will be marked as "outbound" messages

### 7.2 Monitor Logs
Check Supabase function logs for any errors:
```bash
supabase functions logs whatsapp-webhook-receiver
supabase functions logs n8n-bridge
supabase functions logs whatsapp-api-service
```

## Troubleshooting

### Common Issues

1. **Webhook not receiving messages**
   - Verify webhook URL is correct
   - Check if webhook is verified in WhatsApp dashboard
   - Ensure environment variables are set

2. **Auto-replies not working**
   - Check n8n workflow is activated
   - Verify n8n webhook URL is correct
   - Check n8n logs for errors

3. **Messages not appearing in dashboard**
   - Check database permissions
   - Verify conversation_participants table exists
   - Check Supabase function logs

### Debug Steps

1. **Test WhatsApp API directly**:
   ```bash
   curl -X POST "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "messaging_product": "whatsapp",
       "to": "RECIPIENT_PHONE",
       "type": "text",
       "text": {"body": "Test message"}
     }'
   ```

2. **Test n8n webhook**:
   ```bash
   curl -X POST "YOUR_N8N_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{
       "message_text": "hello",
       "contact_phone": "1234567890",
       "integration_id": "your-integration-id"
     }'
   ```

## Advanced Configuration

### Custom Auto-Reply Logic
Modify the n8n workflow to add more conditions:
- Add new IF nodes for different keywords
- Create custom response messages
- Add AI integration for smarter replies

### Conversation Management
- Add conversation scoring based on message content
- Implement lead qualification logic
- Add routing to different team members

### Analytics
- Track response times
- Monitor conversation success rates
- Analyze common customer queries

## Support

If you encounter issues:
1. Check the Supabase function logs
2. Verify all environment variables are set
3. Test each component individually
4. Review the n8n workflow execution logs

## Next Steps

Once basic setup is working:
1. Customize auto-reply messages for your business
2. Add more sophisticated conversation logic
3. Integrate with your CRM system
4. Add analytics and reporting features 