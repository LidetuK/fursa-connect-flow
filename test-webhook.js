// Test script to send a webhook to the backend
// Run with: node test-webhook.js

import https from 'https';
import http from 'http';

// Configuration
const WEBHOOK_URL = 'https://fursa-connect-flow-production.up.railway.app/api/whatsapp/webhook';
const USER_ID = 'de673ebb-531f-435b-a542-79e26cf78e50';

// Function to make HTTP request
function makeRequest(url, data, method = 'POST') {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const postData = JSON.stringify(data);
    options.headers['Content-Length'] = Buffer.byteLength(postData);

    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        let parsedData;
        try {
          parsedData = JSON.parse(responseData);
        } catch (e) {
          parsedData = responseData;
        }
        
        resolve({
          statusCode: res.statusCode,
          data: parsedData
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Test webhook data
const webhookData = {
  from: "251717835453",
  message: "Test message from WhatsApp",
  messageType: "text",
  mediaUrl: null,
  mediaType: null,
  whatsappMessageId: "wamid.HBgMMjUxNzE3ODM1NDUzFQIAERgSNkRCRDU1NjYwNjc1NDZFOUZEAA==",
  userId: USER_ID,
  senderName: "WhatsApp User"
};

// Test function
async function testWebhook() {
  console.log('🚀 Testing WhatsApp Webhook...\n');
  console.log('📤 Sending webhook data:', JSON.stringify(webhookData, null, 2));
  console.log('');

  try {
    const response = await makeRequest(WEBHOOK_URL, webhookData);
    
    console.log('📥 Response Status:', response.statusCode);
    console.log('📥 Response Data:', JSON.stringify(response.data, null, 2));
    
    if (response.statusCode === 200 || response.statusCode === 201) {
      console.log('\n✅ Webhook sent successfully!');
      console.log('🎯 Check your dashboard conversations page to see the new conversation.');
    } else {
      console.log('\n❌ Webhook failed!');
    }
    
  } catch (error) {
    console.log('❌ Request failed:', error.message);
  }
}

// Run the test
testWebhook().catch(console.error);
