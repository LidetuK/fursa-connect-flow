// Test script for WhatsApp webhook integration
// Run with: node test-webhook.js

const https = require('https');
const http = require('http');

// Configuration
const WEBHOOK_URL = 'https://your-backend-url.com/api/whatsapp/webhook'; // Replace with your actual URL
const USER_ID = 'your-user-id-here'; // Replace with actual user ID

// Test data
const testMessages = [
  {
    from: '+1234567890',
    message: 'Hello, I\'m interested in your AI services',
    messageType: 'text',
    mediaUrl: null,
    mediaType: null,
    whatsappMessageId: 'msg_test_001',
    userId: USER_ID,
    senderName: 'John Doe'
  },
  {
    from: '+1234567891',
    message: 'Can you tell me more about your pricing?',
    messageType: 'text',
    mediaUrl: null,
    mediaType: null,
    whatsappMessageId: 'msg_test_002',
    userId: USER_ID,
    senderName: 'Jane Smith'
  },
  {
    from: '+1234567892',
    message: 'I need help with my current setup',
    messageType: 'text',
    mediaUrl: null,
    mediaType: null,
    whatsappMessageId: 'msg_test_003',
    userId: USER_ID,
    senderName: 'Mike Johnson'
  }
];

// Function to make HTTP request
function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data))
      }
    };

    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            data: parsedData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}

// Test function
async function testWebhook() {
  console.log('🚀 Starting WhatsApp webhook tests...\n');
  
  for (let i = 0; i < testMessages.length; i++) {
    const message = testMessages[i];
    console.log(`📨 Testing message ${i + 1}: ${message.message.substring(0, 50)}...`);
    
    try {
      const response = await makeRequest(WEBHOOK_URL, message);
      
      if (response.statusCode === 200) {
        console.log(`✅ Success! Status: ${response.statusCode}`);
        console.log(`   Conversation ID: ${response.data.conversationId}`);
        console.log(`   Message ID: ${response.data.messageId}`);
      } else {
        console.log(`❌ Error! Status: ${response.statusCode}`);
        console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
      }
    } catch (error) {
      console.log(`❌ Request failed: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
    
    // Wait 1 second between requests
    if (i < testMessages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('🎉 Webhook testing completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Check your dashboard for new conversations');
  console.log('2. Verify the conversations appear in real-time');
  console.log('3. Test the conversation details and messages');
}

// Run the test
if (require.main === module) {
  // Check if URL is configured
  if (WEBHOOK_URL === 'https://your-backend-url.com/api/whatsapp/webhook') {
    console.log('❌ Please update the WEBHOOK_URL in this script with your actual backend URL');
    console.log('❌ Please update the USER_ID with your actual user ID');
    process.exit(1);
  }
  
  testWebhook().catch(console.error);
}

module.exports = { testWebhook, makeRequest };
