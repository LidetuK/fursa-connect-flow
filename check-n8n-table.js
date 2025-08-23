// Script to check what's in the n8n_chat_histories table
// Run with: node check-n8n-table.js

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
async function checkN8nTable() {
  console.log('🔍 Checking n8n_chat_histories table...\n');

  try {
    // Test getting messages for a known n8n conversation ID
    console.log('📋 1. Testing n8n messages endpoint...');
    const messagesResponse = await makeRequest(`${API_BASE_URL}/conversations/n8n_251717835453/n8n-messages`);
    console.log('Status:', messagesResponse.statusCode);
    console.log('Response:', JSON.stringify(messagesResponse.data, null, 2));
    console.log('');

    // Test getting all conversations to see if n8n ones are included
    console.log('📋 2. Getting all conversations...');
    const conversationsResponse = await makeRequest(`${API_BASE_URL}/conversations`);
    console.log('Status:', conversationsResponse.statusCode);
    
    const conversations = conversationsResponse.data;
    const n8nConversations = conversations.filter(conv => conv.id && conv.id.startsWith('n8n_'));
    
    console.log('🔍 Found n8n conversations:', n8nConversations.length);
    n8nConversations.forEach(conv => {
      console.log(`   - ${conv.id}: ${conv.title} (${conv.participantPhone})`);
    });
    console.log('');

    // Test direct database query (if available)
    console.log('📋 3. Testing direct database query...');
    const dbResponse = await makeRequest(`${API_BASE_URL}/debug/n8n-table`);
    console.log('Status:', dbResponse.statusCode);
    console.log('Response:', JSON.stringify(dbResponse.data, null, 2));
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
checkN8nTable().catch(console.error);
