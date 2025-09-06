// src/controllers/students.controller.js
const Student = require('../models/Student.model');
const Attendance = require('../models/Attendance.model');
const Report = require('../models/Report.model');
const Event = require('../models/Event.model');
const Exam = require('../models/Exam.model');
const PreviousPaper = require('../models/PreviousPaper.model');

// @desc    Get student dashboard info
// @route   GET /api/students/dashboard
// @access  Student
const getDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id }).populate('user');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Upcoming exams (next 5)
    const upcomingExams = await Exam.find({ className: student.className, date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(5);

    // Recent events (next 5)
    const events = await Event.find({ $or: [{ className: student.className }, { className: null }] })
      .sort({ eventDate: 1 })
      .limit(5);

    // Fee due date & attendance %
    const dashboardData = {
      name: student.user.name,
      rollNumber: student.rollNumber,
      className: student.className,
      section: student.section,
      contactNumber: student.user.contactNumber,
      attendancePercentage: student.attendancePercentage,
      feeDueDate: student.feeDueDate,
      upcomingExams,
      events,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student attendance
// @route   GET /api/students/attendance
// @access  Student
const getAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const attendance = await Attendance.find({ student: student._id }).sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student reports
// @route   GET /api/students/reports
// @access  Student
const getReports = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const reports = await Report.find({ student: student._id }).populate('teacher', 'user');

    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get previous papers
// @route   GET /api/students/previous-papers
// @access  Student
const getPreviousPapers = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const papers = await PreviousPaper.find({ className: student.className }).sort({ uploadDate: -1 });

    res.json(papers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get upcoming exams
// @route   GET /api/students/exams
// @access  Student
const getExams = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const exams = await Exam.find({ className: student.className }).sort({ date: 1 });

    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get upcoming events
// @route   GET /api/students/events
// @access  Student
const getEvents = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const events = await Event.find({ $or: [{ className: student.className }, { className: null }] })
      .sort({ eventDate: 1 });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboard,
  getAttendance,
  getReports,
  getPreviousPapers,
  getExams,
  getEvents,
};
