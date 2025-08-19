# Twilio WhatsApp Integration Setup Guide

This guide will help you set up Twilio WhatsApp API integration with your Fursa Connect application.

## 🚀 Prerequisites

1. **Twilio Account** - You've already created one ✅
2. **Supabase Project** - Already configured ✅
3. **WhatsApp Business Phone Number** - You'll get this from Twilio

## 📋 Step-by-Step Setup

### Step 1: Get Your Twilio Credentials

1. **Log into Twilio Console** at https://console.twilio.com/
2. **Find your Account SID and Auth Token:**
   - Go to Dashboard
   - Copy your **Account SID** (starts with `AC...`)
   - Copy your **Auth Token** (click "Show" to reveal)

3. **Get WhatsApp Phone Number:**
   - Go to **Messaging** → **Try it out** → **Send a WhatsApp message**
   - Or go to **Phone Numbers** → **Manage** → **Active numbers**
   - Your WhatsApp number will be in format: `whatsapp:+1234567890`

### Step 2: Configure Supabase Environment Variables

Add these environment variables to your Supabase project:

```bash
# Twilio Credentials
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
```

**How to add environment variables in Supabase:**
1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **API**
3. Scroll down to **Environment Variables**
4. Add each variable above

### Step 3: Deploy Updated Functions

Deploy the updated Supabase functions:

```bash
# Deploy the updated WhatsApp API service
supabase functions deploy whatsapp-api-service

# Deploy the updated webhook receiver
supabase functions deploy whatsapp-webhook-receiver
```

### Step 4: Configure Twilio Webhook

1. **Get your webhook URL:**
   ```
   https://your-project.supabase.co/functions/v1/whatsapp-webhook-receiver
   ```

2. **Set up webhook in Twilio:**
   - Go to **Messaging** → **Settings** → **WhatsApp Sandbox**
   - Set **Webhook URL** to your Supabase function URL
   - Set **HTTP Method** to `POST`
   - Save the configuration

### Step 5: Test Your Integration

#### 5.1 Send a Test Message via API

```bash
curl -X POST "https://your-project.supabase.co/functions/v1/whatsapp-message-sender" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "integration_id": "your-integration-id",
    "to": "whatsapp:+1234567890",
    "message": "Hello from Twilio WhatsApp!"
  }'
```

#### 5.2 Test Webhook Reception

1. Send a message to your Twilio WhatsApp number
2. Check Supabase function logs:
   ```bash
   supabase functions logs whatsapp-webhook-receiver
   ```

### Step 6: Create WhatsApp Integration in Your App

1. **Go to your app's WhatsApp Integration page**
2. **Click "Connect WhatsApp"**
3. **Enter your Twilio WhatsApp number** (without the `whatsapp:` prefix)
4. **The system will create an integration record**

## 🔧 Configuration Details

### Phone Number Format

- **For sending messages:** Use `whatsapp:+1234567890` format
- **For receiving messages:** Twilio automatically adds `whatsapp:` prefix
- **In your database:** Store without `whatsapp:` prefix

### Message Types Supported

- ✅ **Text messages**
- ✅ **Images** (with media URL)
- ✅ **Documents** (with media URL)
- ✅ **Audio** (with media URL)
- ✅ **Video** (with media URL)

### Webhook Payload Structure

Twilio sends webhooks in this format:
```json
{
  "MessageSid": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "From": "whatsapp:+1234567890",
  "To": "whatsapp:+0987654321",
  "Body": "Hello world!",
  "NumMedia": "0"
}
```

## 🧪 Testing Your Setup

### Test 1: Send Message
```typescript
// In your React app
const sendTestMessage = async () => {
  const response = await fetch('/api/send-whatsapp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
      integration_id: 'your-integration-id',
      to: '+1234567890',
      message: 'Test message from Fursa Connect!'
    })
  });
  
  const result = await response.json();
  console.log('Message sent:', result);
};
```

### Test 2: Receive Message
1. Send a message to your Twilio WhatsApp number
2. Check your app's Conversations page
3. The message should appear in real-time

### Test 3: AI Auto-Reply
1. Set up your n8n workflow (if using)
2. Send a message to your WhatsApp number
3. You should receive an AI-generated response

## 🔍 Troubleshooting

### Common Issues

#### 1. **"Invalid phone number format"**
- **Solution:** Ensure phone numbers include country code
- **Example:** `+1234567890` not `1234567890`

#### 2. **"Authentication failed"**
- **Solution:** Check your Twilio Account SID and Auth Token
- **Verify:** Credentials are correct and not expired

#### 3. **"Webhook not receiving messages"**
- **Solution:** Check webhook URL is correct
- **Verify:** Supabase function is deployed and accessible

#### 4. **"Message not sending"**
- **Solution:** Check Twilio account has sufficient credits
- **Verify:** WhatsApp number is properly configured

### Debug Steps

#### Check Function Logs
```bash
# Check WhatsApp API service logs
supabase functions logs whatsapp-api-service

# Check webhook receiver logs
supabase functions logs whatsapp-webhook-receiver
```

#### Test Twilio API Directly
```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json" \
  -H "Authorization: Basic $(echo -n 'YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN' | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "From=whatsapp:+1234567890&To=whatsapp:+0987654321&Body=Test message"
```

#### Verify Environment Variables
```bash
# Check if environment variables are set
supabase secrets list
```

## 💰 Pricing Information

- **WhatsApp messages:** $0.005 per message (both inbound and outbound)
- **Free trial:** $15 credit for new accounts
- **Billing:** Pay-as-you-go, no monthly fees

## 🔒 Security Best Practices

1. **Never commit credentials to code**
2. **Use environment variables for all secrets**
3. **Rotate Auth Token regularly**
4. **Monitor usage and costs**
5. **Set up webhook signature verification** (optional but recommended)

## 📞 Support Resources

- **Twilio Documentation:** https://www.twilio.com/docs/whatsapp
- **Twilio Support:** https://support.twilio.com/
- **Supabase Functions:** https://supabase.com/docs/guides/functions
- **Project Issues:** Create an issue in this repository

## 🎯 Next Steps

Once basic setup is working:

1. **Customize AI responses** for your business
2. **Add conversation management** features
3. **Implement analytics** and reporting
4. **Set up team collaboration** features
5. **Add multi-language support**

## ✅ Checklist

- [ ] Twilio account created
- [ ] Account SID and Auth Token obtained
- [ ] WhatsApp phone number configured
- [ ] Environment variables set in Supabase
- [ ] Functions deployed
- [ ] Webhook URL configured in Twilio
- [ ] Test message sent successfully
- [ ] Test message received successfully
- [ ] AI auto-reply working (if applicable)

---

**Need help?** Check the troubleshooting section above or create an issue in the repository.
