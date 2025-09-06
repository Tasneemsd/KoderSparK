// src/middlewares/studentAuth.middleware.js
const authMiddleware = require('./auth.middleware');

const studentAuthMiddleware = (req, res, next) => {
  // First, verify the user is authenticated
  authMiddleware(req, res, () => {
    // Check if user's role is student
    if (req.user && req.user.role === 'student') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Students only' });
    }
  });
};

module.exports = studentAuthMiddleware;
