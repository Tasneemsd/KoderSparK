// src/routes/notifications.routes.js
const express = require('express');
const router = express.Router();
const { getNotifications } = require('../controllers/notifications.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // or whichever general auth you use

// @route   GET /api/notifications
// @desc    Get notifications for logged-in user
// @access  All roles
router.get('/', authMiddleware, getNotifications);

module.exports = router;
