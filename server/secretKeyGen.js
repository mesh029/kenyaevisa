const crypto = require('crypto');

try {
  const secretKey = crypto.randomBytes(32).toString('hex');
  console.log('Generated Secret Key:', secretKey);
} catch (error) {
  console.error('Error generating secret key:', error);
}
