// src/controllers/admin.controller.js
const Admin = require('../models/Admin.model');
const Student = require('../models/Student.model');
const Teacher = require('../models/Teacher.model');
const Event = require('../models/Event.model');
const Exam = require('../models/Exam.model');
const Report = require('../models/Report.model');
const Attendance = require('../models/Attendance.model');
const Notification = require('../models/Notification.model');

// @desc    Get admin dashboard overview
// @route   GET /api/admin/dashboard
// @access  Admin
const getDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalExams = await Exam.countDocuments();

    // Example analytics: average attendance across all students
    const allAttendance = await Attendance.find();
    const attendancePercentage =
      allAttendance.length > 0
        ? allAttendance.filter(a => a.status === 'present').length / allAttendance.length * 100
        : 0;

    res.json({
      totalStudents,
      totalTeachers,
      totalEvents,
      totalExams,
      averageAttendance: attendancePercentage.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new event
// @route   POST /api/admin/events
// @access  Admin
const createEvent = async (req, res) => {
  const { title, description, eventDate, startTime, endTime, className } = req.body;

  try {
    const event = await Event.create({
      title,
      description,
      eventDate,
      startTime,
      endTime,
      className,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send notification
// @route   POST /api/admin/notifications
// @access  Admin
const sendNotification = async (req, res) => {
  const { title, message, recipientRole, recipientIds } = req.body;

  try {
    const notification = await Notification.create({
      title,
      message,
      recipientRole,
      recipientIds,
      sentBy: req.user._id,
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Admin
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user');
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Admin
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('user');
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get reports analytics
// @route   GET /api/admin/reports-analytics
// @access  Admin
const getReportsAnalytics = async (req, res) => {
  try {
    const reports = await Report.find().populate('student').populate('teacher');

    // Example: average marks per subject
    const subjectMap = {};
    reports.forEach(r => {
      if (!subjectMap[r.subject]) subjectMap[r.subject] = [];
      if (r.marks !== undefined) subjectMap[r.subject].push(r.marks);
    });

    const avgMarks = {};
    Object.keys(subjectMap).forEach(sub => {
      const marksArr = subjectMap[sub];
      const avg = marksArr.reduce((a, b) => a + b, 0) / marksArr.length;
      avgMarks[sub] = avg.toFixed(2);
    });

    res.json({ totalReports: reports.length, averageMarksPerSubject: avgMarks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboard,
  createEvent,
  sendNotification,
  getAllStudents,
  getAllTeachers,
  getReportsAnalytics,
};
