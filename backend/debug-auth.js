const bcrypt = require('bcryptjs');

// Test the authentication logic
async function debugAuth() {
  console.log('🔍 Debugging Authentication');
  console.log('==========================');
  
  const email = 'test@fursa.com';
  const password = 'testpassword123';
  const storedHash = '$2a$10$UPBlh45qEKVg7JDcEr8LfeXzPO4NVUBMlHzAfQqiCr49.YSCcKuga';
  
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Stored Hash:', storedHash);
  console.log('');
  
  // Test password comparison
  const isValid = await bcrypt.compare(password, storedHash);
  console.log('✅ Password comparison result:', isValid);
  
  // Generate a new hash for comparison
  const newHash = await bcrypt.hash(password, 10);
  console.log('🆕 New hash:', newHash);
  console.log('✅ New hash comparison:', await bcrypt.compare(password, newHash));
  
  console.log('');
  console.log('📝 If the stored hash comparison failed, run this SQL:');
  console.log(`UPDATE users SET password = '${newHash}' WHERE email = '${email}';`);
}

debugAuth();
