// Authentication utilities

const crypto = require('crypto');

// Generate a secure random token
function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Hash a password securely
function hashPassword(password, salt = null) {
  // Generate a salt if not provided
  salt = salt || crypto.randomBytes(16).toString('hex');
  
  // Security fix: Increased iterations from 1000 to 10000 for better security
  const iterations = 10000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
  
  return {
    hash,
    salt
  };
}

// Verify a password against a stored hash
function verifyPassword(password, storedHash, salt) {
  const { hash } = hashPassword(password, salt);
  return hash === storedHash;
}

module.exports = {
  generateToken,
  hashPassword,
  verifyPassword
};
