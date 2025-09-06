// src/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth.middleware');
const {
  getDashboard,
  createEvent,
  sendNotification,
  getAllStudents,
  getAllTeachers,
  getReportsAnalytics,
} = require('../controllers/admin.controller');

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard overview
// @access  Admin
router.get('/dashboard', adminAuth, getDashboard);

// @route   POST /api/admin/events
// @desc    Create new event
// @access  Admin
router.post('/events', adminAuth, createEvent);

// @route   POST /api/admin/notifications
// @desc    Send notification
// @access  Admin
router.post('/notifications', adminAuth, sendNotification);

// @route   GET /api/admin/students
// @desc    Get all students
// @access  Admin
router.get('/students', adminAuth, getAllStudents);

// @route   GET /api/admin/teachers
// @desc    Get all teachers
// @access  Admin
router.get('/teachers', adminAuth, getAllTeachers);

// @route   GET /api/admin/reports-analytics
// @desc    Get reports analytics
// @access  Admin
router.get('/reports-analytics', adminAuth, getReportsAnalytics);

module.exports = router;

