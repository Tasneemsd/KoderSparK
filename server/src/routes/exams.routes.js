// src/routes/exams.routes.js
const express = require('express');
const router = express.Router();
const { getExams } = require('../controllers/exams.controller');

// @route   GET /api/exams
// @desc    Get exams (optionally filtered by class)
// @access  Public / Student or Teacher
router.get('/', getExams);

module.exports = router;
