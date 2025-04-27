// Main application file

const appVersion = '1.0.0';

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
