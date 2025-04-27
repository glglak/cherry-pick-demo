// Application configuration

const config = {
  environment: 'development',
  port: 3000,
  logLevel: 'debug',
  database: {
    host: 'localhost',
    port: 27017,
    name: 'myapp'
  },
  apiKeys: {
    service1: 'demo-key-1',
    service2: 'demo-key-2'
  }
};

module.exports = config;
