// src/utils/validator.js
class Validator {
  // Check if email is valid
  static isEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Check if string is not empty
  static isRequired(value) {
    return value !== undefined && value !== null && value.toString().trim() !== '';
  }

  // Check if phone number is valid (10 digits)
  static isPhoneNumber(number) {
    const regex = /^\d{10}$/;
    return regex.test(number);
  }

  // Validate password strength (example)
  static isStrongPassword(password) {
    return password.length >= 6; // you can expand with regex for more rules
  }
}

module.exports = Validator;
