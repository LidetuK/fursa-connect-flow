// Simple test to check database connection
// Run with: node test-db-connection.js

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
async function testDbConnection() {
  console.log('🔍 Testing Database Connection...\n');

  try {
    // Test 1: Check if backend is responding
    console.log('📋 1. Testing backend health...');
    const healthResponse = await makeRequest(`${API_BASE_URL}/health`);
    console.log('Status:', healthResponse.statusCode);
    console.log('Response:', JSON.stringify(healthResponse.data, null, 2));
    console.log('');

    // Test 2: Try to access the debug endpoint
    console.log('📋 2. Testing debug endpoint...');
    const debugResponse = await makeRequest(`${API_BASE_URL}/conversations/debug/n8n-table`);
    console.log('Status:', debugResponse.statusCode);
    if (debugResponse.statusCode === 200) {
      console.log('✅ Debug endpoint working!');
      console.log('Response:', JSON.stringify(debugResponse.data, null, 2));
    } else {
      console.log('❌ Debug endpoint not found - backend not deployed with new code');
    }
    console.log('');

    // Test 3: Check if we can get n8n messages directly
    console.log('📋 3. Testing n8n messages endpoint...');
    const messagesResponse = await makeRequest(`${API_BASE_URL}/conversations/n8n_251717835453/n8n-messages`);
    console.log('Status:', messagesResponse.statusCode);
    console.log('Response:', JSON.stringify(messagesResponse.data, null, 2));
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testDbConnection().catch(console.error);
