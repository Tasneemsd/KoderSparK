// src/controllers/reports.controller.js
const Report = require('../models/Report.model');

// @desc    Get all reports (optional filter by studentId or teacherId)
// @route   GET /api/reports
// @access  Student / Teacher
const getReports = async (req, res) => {
  const { studentId, teacherId } = req.query;
  const filter = {};

  if (studentId) filter.student = studentId;
  if (teacherId) filter.teacher = teacherId;

  try {
    const reports = await Report.find(filter)
      .populate('student', 'rollNumber className section')
      .populate('teacher', 'user');
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReports };
