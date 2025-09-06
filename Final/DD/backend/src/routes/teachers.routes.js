

const express = require('express');
const router = express.Router();
const teacherAuth = require('../middlewares/teacherAuth.middleware');
const {
  getDashboard,
  markAttendance,
  addReport,
  getStudents,
  uploadPreviousPaper,
  getExams,
  bulkReport
} = require('../controllers/teachers.controller');
// @route   POST /api/teachers/bulk-reports
// @desc    Bulk add/update student reports (marks)
// @access  Teacher
router.post('/bulk-reports', teacherAuth, bulkReport);

// @route   GET /api/teachers/dashboard
// @desc    Get teacher dashboard info
// @access  Teacher
router.get('/dashboard', teacherAuth, getDashboard);

// @route   POST /api/teachers/attendance
// @desc    Mark attendance for a student
// @access  Teacher
router.post('/attendance', teacherAuth, markAttendance);

// @route   POST /api/teachers/reports
// @desc    Add or update student report
// @access  Teacher
router.post('/reports', teacherAuth, addReport);

// @route   GET /api/teachers/students
// @desc    Get all students assigned to teacher
// @access  Teacher
router.get('/students', teacherAuth, getStudents);

// @route   POST /api/teachers/previous-papers
// @desc    Upload previous paper
// @access  Teacher
router.post('/previous-papers', teacherAuth, uploadPreviousPaper);

// @route   GET /api/teachers/exams
// @desc    Get upcoming exams for teacher's classes
// @access  Teacher
router.get('/exams', teacherAuth, getExams);

module.exports = router;
