// src/utils/helpers.js
const crypto = require('crypto');

class Helpers {
  // Generate a random token (e.g., for password reset or QR codes)
  static generateToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Format date to YYYY-MM-DD
  static formatDate(date) {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Example: simple logger
  static log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

module.exports = Helpers;
