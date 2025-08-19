// Test the login endpoint directly
const API_URL = 'http://localhost:3001/api';

async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@fursa.com',
        password: 'testpassword123'
      })
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('Token:', data.access_token);
    } else {
      console.log('❌ Login failed:', data);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

testLogin();
