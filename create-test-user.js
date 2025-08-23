// Script to create a test user and get JWT token
// Run with: node create-test-user.js

const https = require('https');
const http = require('http');

// Configuration
const API_BASE_URL = 'https://fursa-connect-flow-production.up.railway.app/api';

// Function to make HTTP request
function makeRequest(url, data, method = 'POST') {
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

// Function to decode JWT token
function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

// Test function
async function createTestUser() {
  console.log('🚀 Creating test user...\n');
  
  const testUser = {
    email: 'test@example.com',
    password: 'testpassword123',
    firstName: 'Test',
    lastName: 'User'
  };
  
  try {
    console.log('📝 Attempting to register user:', testUser.email);
    const response = await makeRequest(`${API_BASE_URL}/auth/register`, testUser);
    
    if (response.statusCode === 201 || response.statusCode === 200) {
      console.log('✅ User created successfully!');
      console.log('🔑 JWT Token:', response.data.access_token);
      
      // Decode the token to get user ID
      const decoded = decodeJWT(response.data.access_token);
      if (decoded) {
        console.log('👤 User ID:', decoded.sub || decoded.id);
        console.log('📧 Email:', decoded.email);
        console.log('📋 Full token payload:', JSON.stringify(decoded, null, 2));
        
        console.log('\n🎯 Next steps:');
        console.log('1. Copy the User ID above');
        console.log('2. Update test-webhook.js with your User ID');
        console.log('3. Run: node test-webhook.js');
      }
    } else {
      console.log('❌ Registration failed! Status:', response.statusCode);
      console.log('Response:', JSON.stringify(response.data, null, 2));
      
      // Try logging in instead
      console.log('\n🔄 Trying to login with existing user...');
      const loginResponse = await makeRequest(`${API_BASE_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      
      if (loginResponse.statusCode === 200) {
        console.log('✅ Login successful!');
        console.log('🔑 JWT Token:', loginResponse.data.access_token);
        
        const decoded = decodeJWT(loginResponse.data.access_token);
        if (decoded) {
          console.log('👤 User ID:', decoded.sub || decoded.id);
          console.log('📧 Email:', decoded.email);
          console.log('📋 Full token payload:', JSON.stringify(decoded, null, 2));
          
          console.log('\n🎯 Next steps:');
          console.log('1. Copy the User ID above');
          console.log('2. Update test-webhook.js with your User ID');
          console.log('3. Run: node test-webhook.js');
        }
      } else {
        console.log('❌ Login also failed! Status:', loginResponse.statusCode);
        console.log('Response:', JSON.stringify(loginResponse.data, null, 2));
      }
    }
  } catch (error) {
    console.log('❌ Request failed:', error.message);
  }
}

// Run the test
if (require.main === module) {
  createTestUser().catch(console.error);
}

module.exports = { createTestUser, makeRequest, decodeJWT };

