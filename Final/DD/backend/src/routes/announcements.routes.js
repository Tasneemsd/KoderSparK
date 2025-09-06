// src/routes/announcements.routes.js
const express = require('express');
const router = express.Router();

const { createAnnouncement, getAnnouncements } = require('../controllers/announcements.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminAuth = require('../middlewares/adminAuth.middleware');

// Create announcement (admin only)
router.post('/', authMiddleware, adminAuth, createAnnouncement);
// Get announcements (all roles)
router.get('/', authMiddleware, getAnnouncements);

module.exports = router;
