// src/routes/analytics.routes.js
const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth.middleware');
const { getReportsAnalytics } = require('../controllers/admin.controller');

// @route   GET /api/analytics/reports
// @desc    Get analytics on reports (e.g., average marks per subject)
// @access  Admin only
router.get('/reports', adminAuth, getReportsAnalytics);

module.exports = router;
