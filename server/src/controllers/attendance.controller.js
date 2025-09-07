// src/controllers/attendance.controller.js
const Attendance = require('../models/Attendance.model');

// @desc    Get attendance (optional filter by studentId or className)
// @route   GET /api/attendance
// @access  Student / Teacher
const getAttendance = async (req, res) => {
  const { studentId, className } = req.query;
  const filter = {};

  if (studentId) filter.student = studentId;
  if (className) filter.className = className;

  try {
    const attendance = await Attendance.find(filter).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAttendance };
