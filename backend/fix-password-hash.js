const bcrypt = require('bcryptjs');

// Generate the correct hash for 'testpassword123'
const password = 'testpassword123';
const saltRounds = 10;
const hash = bcrypt.hashSync(password, saltRounds);

console.log('🔧 Password Hash Fix');
console.log('===================');
console.log('Password:', password);
console.log('Correct Hash:', hash);
console.log('');

// Test the hash
const isValid = bcrypt.compareSync(password, hash);
console.log('✅ Hash verification:', isValid ? 'PASSED' : 'FAILED');
console.log('');

console.log('📝 SQL Command to Fix Database:');
console.log('================================');
console.log(`UPDATE users SET password = '${hash}' WHERE email = 'test@fursa.com';`);
console.log('');

console.log('🔍 To verify after update:');
console.log("SELECT email, password FROM users WHERE email = 'test@fursa.com';");
