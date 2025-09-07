// src/routes/attendance.routes.js
const express = require('express');
const router = express.Router();
const { getAttendance } = require('../controllers/attendance.controller');

// @route   GET /api/attendance
// @desc    Get attendance (filter by studentId or className)
// @access  Student / Teacher
router.get('/', getAttendance);

module.exports = router;
