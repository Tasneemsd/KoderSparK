// src/routes/students.routes.js
const express = require('express');
const router = express.Router();
const studentAuth = require('../middlewares/studentAuth.middleware');
const {
  getDashboard,
  getAttendance,
  getReports,
  getPreviousPapers,
  getExams,
  getEvents,
} = require('../controllers/students.controller');

// @route   GET /api/students/dashboard
// @desc    Get student dashboard info
// @access  Student
router.get('/dashboard', studentAuth, getDashboard);

// @route   GET /api/students/attendance
// @desc    Get student attendance
// @access  Student
router.get('/attendance', studentAuth, getAttendance);

// @route   GET /api/students/reports
// @desc    Get student reports
// @access  Student
router.get('/reports', studentAuth, getReports);

// @route   GET /api/students/previous-papers
// @desc    Get previous papers
// @access  Student
router.get('/previous-papers', studentAuth, getPreviousPapers);

// @route   GET /api/students/exams
// @desc    Get upcoming exams
// @access  Student
router.get('/exams', studentAuth, getExams);

// @route   GET /api/students/events
// @desc    Get upcoming events
// @access  Student
router.get('/events', studentAuth, getEvents);

module.exports = router;
