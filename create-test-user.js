// Script to create a test user for login
const API_URL = 'http://localhost:3001/api';

async function createTestUser() {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@fursa.com',
        password: 'testpassword123',
        firstName: 'Test',
        lastName: 'User'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Test user created successfully!');
      console.log('📧 Email: test@fursa.com');
      console.log('🔑 Password: testpassword123');
      console.log('🎫 Token:', data.access_token);
    } else {
      console.error('❌ Error creating user:', data);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

createTestUser();
