// src/controllers/exams.controller.js
const Exam = require('../models/Exam.model');

// @desc    Get exams (optionally filter by class)
// @route   GET /api/exams
// @access  Public / Student or Teacher
const getExams = async (req, res) => {
  const { className } = req.query;

  try {
    const filter = className ? { className } : {};
    const exams = await Exam.find(filter).sort({ date: 1 });

    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getExams };
