# WhatsApp Webhook Integration Guide

This guide explains how to connect your WhatsApp automation workflow to the FursaAI dashboard to display conversations and analytics.

## Overview

Your automation workflow processes WhatsApp messages (text, audio, images) and uses AI to respond. Now you can send these conversations to your dashboard for real-time monitoring and analytics.

## Webhook Endpoint

**URL**: `https://your-backend-url.com/api/whatsapp/webhook`

**Method**: `POST`

**Content-Type**: `application/json`

## Webhook Payload Format

When your automation workflow receives a WhatsApp message, send this data to the webhook:

```json
{
  "from": "+1234567890",
  "message": "Hello, I'm interested in your services",
  "messageType": "text",
  "mediaUrl": null,
  "mediaType": null,
  "whatsappMessageId": "msg_123456789",
  "userId": "user-uuid-here",
  "senderName": "John Doe"
}
```

### Field Descriptions

- `from`: The phone number of the sender (required)
- `message`: The message content (required)
- `messageType`: Type of message - "text", "audio", "image", "document" (required)
- `mediaUrl`: URL to media file if applicable (optional)
- `mediaType`: MIME type of media if applicable (optional)
- `whatsappMessageId`: Unique message ID from WhatsApp (required)
- `userId`: The user ID who owns this conversation (required)
- `senderName`: Name of the sender if available (optional)

## Integration Steps

### 1. Update Your Automation Workflow

In your automation workflow (n8n, Zapier, etc.), add an HTTP request node after processing the message:

**For n8n:**
1. Add an "HTTP Request" node
2. Set method to "POST"
3. Set URL to your webhook endpoint
4. Set body to JSON with the payload format above
5. Connect this after your AI processing

**For Zapier:**
1. Add a "Webhooks by Zapier" action
2. Set method to "POST"
3. Set URL to your webhook endpoint
4. Map the fields to match the payload format

### 2. Handle Different Message Types

#### Text Messages
```json
{
  "from": "+1234567890",
  "message": "Hello, I'm interested in your services",
  "messageType": "text",
  "whatsappMessageId": "msg_123456789",
  "userId": "user-uuid-here"
}
```

#### Audio Messages
```json
{
  "from": "+1234567890",
  "message": "Transcribed audio content here",
  "messageType": "audio",
  "mediaUrl": "https://example.com/audio-file.mp3",
  "mediaType": "audio/mpeg",
  "whatsappMessageId": "msg_123456789",
  "userId": "user-uuid-here"
}
```

#### Image Messages
```json
{
  "from": "+1234567890",
  "message": "Image description or analysis",
  "messageType": "image",
  "mediaUrl": "https://example.com/image.jpg",
  "mediaType": "image/jpeg",
  "whatsappMessageId": "msg_123456789",
  "userId": "user-uuid-here"
}
```

### 3. Send AI Responses

After your AI processes the message and generates a response, send it to the dashboard:

**Endpoint**: `https://your-backend-url.com/api/whatsapp/bot-response`

**Method**: `POST`

**Headers**: Include your authentication token

```json
{
  "conversationId": "conversation-uuid-from-webhook-response",
  "response": "Thank you for your message! I'd be happy to help you with our services."
}
```

### 4. Update Lead Scoring

When your AI determines a lead score, update it:

**Endpoint**: `https://your-backend-url.com/api/whatsapp/update-score/{conversationId}`

**Method**: `POST`

```json
{
  "score": 85
}
```

### 5. Update Intent Classification

When your AI classifies the user's intent:

**Endpoint**: `https://your-backend-url.com/api/whatsapp/update-intent/{conversationId}`

**Method**: `POST`

```json
{
  "intent": "product_inquiry"
}
```

## Complete Workflow Example

1. **Receive WhatsApp message** → Your automation workflow
2. **Process message** → AI analyzes content, transcribes audio, analyzes images
3. **Send to webhook** → POST to `/api/whatsapp/webhook`
4. **Generate AI response** → Your AI generates appropriate response
5. **Send bot response** → POST to `/api/whatsapp/bot-response`
6. **Update scoring** → POST to `/api/whatsapp/update-score/{conversationId}`
7. **Update intent** → POST to `/api/whatsapp/update-intent/{conversationId}`
8. **Send response** → Send response back to WhatsApp user

## Dashboard Features

Once integrated, your dashboard will show:

- **Real-time conversations** from WhatsApp
- **Lead scoring** and intent classification
- **Message history** with timestamps
- **Analytics** on conversation performance
- **Channel statistics** (WhatsApp vs other channels)
- **Response times** and engagement metrics

## Authentication

For protected endpoints (bot-response, update-score, update-intent), include your JWT token in the Authorization header:

```
Authorization: Bearer your-jwt-token-here
```

## Error Handling

The webhook returns:
- `200 OK` with `{"success": true, "conversationId": "uuid", "messageId": "uuid"}` on success
- `400 Bad Request` with error details on failure

## Testing

1. Use a tool like Postman to test the webhook endpoint
2. Send a test message payload
3. Check your dashboard for the new conversation
4. Verify the conversation appears in real-time

## Support

If you need help with the integration:
1. Check the webhook response for error messages
2. Verify your payload format matches the specification
3. Ensure your backend is running and accessible
4. Check authentication tokens for protected endpoints

## Next Steps

After successful integration:
1. Monitor conversations in your dashboard
2. Set up analytics and reporting
3. Configure automated responses based on intent
4. Implement lead scoring algorithms
5. Set up notifications for high-priority conversations
