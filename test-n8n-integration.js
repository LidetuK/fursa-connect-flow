// Test script to verify n8n integration
// Run with: node test-n8n-integration.js

import https from 'https';
import http from 'http';

// Configuration
const API_BASE_URL = 'https://fursa-connect-flow-production.up.railway.app/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGV4YW1wbGUuY29tIiwic3ViIjoiZGU2NzNlYmItNTMxZi00MzViLWE1NDItNzllMjZjZjc4ZTUwIiwiaWF0IjoxNzU1OTc4MDUzLCJleHAiOjE3NTY1ODI4NTN9.VDoQwOHPZHu57T-6H8G1f49eCqbi3P_RJM5e_ivK4jI';

// Function to make HTTP request
function makeRequest(url, data = null, method = 'GET') {
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

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

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test functions
async function testN8nIntegration() {
  console.log('🚀 Testing n8n Integration...\n');

  try {
    // 1. Get all conversations (should include n8n conversations)
    console.log('📋 1. Getting all conversations...');
    const conversationsResponse = await makeRequest(`${API_BASE_URL}/conversations`);
    console.log('Status:', conversationsResponse.statusCode);
    console.log('Response:', JSON.stringify(conversationsResponse.data, null, 2));
    console.log('');

    // 2. Check if n8n conversations are present
    const conversations = conversationsResponse.data;
    const n8nConversations = conversations.filter(conv => conv.id && conv.id.startsWith('n8n_'));
    
    console.log('🔍 2. Found n8n conversations:', n8nConversations.length);
    n8nConversations.forEach(conv => {
      console.log(`   - ${conv.id}: ${conv.title} (${conv.participantPhone})`);
    });
    console.log('');

    // 3. Test getting messages for an n8n conversation
    if (n8nConversations.length > 0) {
      const firstN8nConv = n8nConversations[0];
      console.log('💬 3. Getting messages for n8n conversation:', firstN8nConv.id);
      const messagesResponse = await makeRequest(`${API_BASE_URL}/conversations/${firstN8nConv.id}/n8n-messages`);
      console.log('Status:', messagesResponse.statusCode);
      console.log('Messages:', JSON.stringify(messagesResponse.data, null, 2));
      console.log('');
    }

    // 4. Get conversation stats
    console.log('📊 4. Getting conversation stats...');
    const statsResponse = await makeRequest(`${API_BASE_URL}/conversations/stats`);
    console.log('Status:', statsResponse.statusCode);
    console.log('Stats:', JSON.stringify(statsResponse.data, null, 2));
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testN8nIntegration().catch(console.error);
