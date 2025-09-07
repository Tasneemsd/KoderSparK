// src/routes/events.routes.js
const express = require('express');
const router = express.Router();
const { getEvents } = require('../controllers/events.controller');

// @route   GET /api/events
// @desc    Get all events (optionally filtered by class)
// @access  Public / Student
router.get('/', getEvents);

module.exports = router;
