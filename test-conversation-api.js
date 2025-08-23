// Test script to check conversation API directly
// Run with: node test-conversation-api.js

const https = require('https');
const http = require('http');

// Configuration
const API_BASE_URL = 'https://fursa-connect-flow-production.up.railway.app/api';
const USER_ID = '8f7dad15-a964-4ca9-a2a6-86d7f9ee53dd';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJzdWIiOiI4ZjdkYWQxNS1hOTY0LTRjYTktYTJhNi04NmQ3ZjllZTUzZGQiLCJpYXQiOjE3NTU5NDA0MjQsImV4cCI6MTc1NjU0NTIyNH0.oHik31BebuR6g_a3BiJ-nVf5KWr1QmjxhBXASAEWp1Q';

// Function to make HTTP request
function makeRequest(url, data = null, method = 'GET') {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    }

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

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test functions
async function testConversationsAPI() {
  console.log('🚀 Testing Conversations API...\n');

  try {
    // 1. Get all conversations
    console.log('📋 1. Getting all conversations...');
    const conversationsResponse = await makeRequest(`${API_BASE_URL}/conversations`);
    console.log('Status:', conversationsResponse.statusCode);
    console.log('Response:', JSON.stringify(conversationsResponse.data, null, 2));
    console.log('');

    // 2. Get conversation stats
    console.log('📊 2. Getting conversation stats...');
    const statsResponse = await makeRequest(`${API_BASE_URL}/conversations/stats`);
    console.log('Status:', statsResponse.statusCode);
    console.log('Response:', JSON.stringify(statsResponse.data, null, 2));
    console.log('');

    // 3. Create a test conversation
    console.log('➕ 3. Creating a test conversation...');
    const createResponse = await makeRequest(`${API_BASE_URL}/conversations`, {
      title: 'Test Conversation',
      userId: USER_ID,
      channel: 'whatsapp',
      status: 'active',
      participantPhone: '+1234567890',
      participantName: 'Test User'
    }, 'POST');
    console.log('Status:', createResponse.statusCode);
    console.log('Response:', JSON.stringify(createResponse.data, null, 2));
    console.log('');

    // 4. Get conversations again to see if new one appears
    console.log('📋 4. Getting conversations again...');
    const conversationsResponse2 = await makeRequest(`${API_BASE_URL}/conversations`);
    console.log('Status:', conversationsResponse2.statusCode);
    console.log('Response:', JSON.stringify(conversationsResponse2.data, null, 2));
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
if (require.main === module) {
  testConversationsAPI().catch(console.error);
}

module.exports = { testConversationsAPI, makeRequest };
