// src/middlewares/adminAuth.middleware.js
const authMiddleware = require('./auth.middleware');

const adminAuthMiddleware = (req, res, next) => {
  // First, check if user is authenticated
  authMiddleware(req, res, () => {
    // Check if user's role is admin
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Admins only' });
    }
  });
};

module.exports = adminAuthMiddleware;
