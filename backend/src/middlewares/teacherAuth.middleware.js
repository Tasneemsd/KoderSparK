// src/middlewares/teacherAuth.middleware.js
const authMiddleware = require('./auth.middleware');

const teacherAuthMiddleware = (req, res, next) => {
  // First, check if user is authenticated
  authMiddleware(req, res, () => {
    // Check if user's role is teacher
    if (req.user && req.user.role === 'teacher') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Teachers only' });
    }
  });
};

module.exports = teacherAuthMiddleware;
