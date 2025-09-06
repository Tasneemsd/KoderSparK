// src/config/keys.config.js

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret', // Secret for signing JWT tokens
  TOKEN_EXPIRY: '7d', // JWT token expiry time
  mongoURI: process.env.MONGO_URI, // MongoDB connection string from .env
  port: process.env.PORT || 5000, // Server port from .env or default 5000
  // Add other keys or constants here in the future if needed
};
