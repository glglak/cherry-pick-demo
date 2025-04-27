// Main application file

const appVersion = '1.0.1'; // Version updated for bug fix

// Core functionality
function initializeApp() {
  console.log(`Starting application v${appVersion}`);
  return {
    status: 'running',
    startTime: new Date()
  };
}

// Feature: User management
function createUser(username, email) {
  // Bug fix: Added validation to prevent null usernames
  if (!username || !email) {
    throw new Error('Username and email are required');
  }
  
  return {
    id: Math.floor(Math.random() * 1000),
    username,
    email,
    createdAt: new Date()
  };
}

// Export functions
module.exports = {
  initializeApp,
  createUser
};
