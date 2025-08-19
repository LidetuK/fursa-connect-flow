const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password', // Update this if your password is different
  database: 'fursa_connect',
});

async function debugUsers() {
  try {
    console.log('🔍 Debugging Users Database');
    console.log('==========================');
    
    // Get all users
    const result = await pool.query('SELECT id, email, "firstName", "lastName" FROM users ORDER BY "createdAt" DESC');
    
    console.log(`📊 Total users in database: ${result.rows.length}`);
    console.log('');
    
    if (result.rows.length > 0) {
      console.log('👥 Existing users:');
      result.rows.forEach((user, index) => {
        console.log(`${index + 1}. ID: ${user.id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Name: ${user.firstName} ${user.lastName}`);
        console.log('');
      });
    } else {
      console.log('❌ No users found in database');
    }
    
    // Test specific email lookup
    const testEmails = ['test@fursa.com', 'newtest@fursa.com', 'testuser2@fursa.com', 'nonexistent@test.com'];
    
    console.log('🔍 Testing email lookups:');
    for (const email of testEmails) {
      const userResult = await pool.query('SELECT id, email FROM users WHERE email = $1', [email]);
      const exists = userResult.rows.length > 0;
      console.log(`   ${email}: ${exists ? '✅ EXISTS' : '❌ NOT FOUND'}`);
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await pool.end();
  }
}

debugUsers();
