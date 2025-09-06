// src/routes/reports.routes.js
const express = require('express');
const router = express.Router();
const { getReports } = require('../controllers/reports.controller');

// @route   GET /api/reports
// @desc    Get reports (filter by studentId or teacherId)
// @access  Student / Teacher
router.get('/', getReports);

module.exports = router;
