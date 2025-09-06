// src/controllers/previousPapers.controller.js
const PreviousPaper = require('../models/PreviousPaper.model');
const path = require('path');

// @desc    Upload a previous year paper
// @route   POST /api/previous-papers
// @access  Teacher
exports.uploadPaper = async (req, res) => {
  try {
    const { title, className, subject } = req.body;
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = req.files.file;
    const ext = path.extname(file.name);
    const fileName = `${Date.now()}_${file.name}`;
    const uploadPath = path.join(__dirname, '../../uploads', fileName);
    await file.mv(uploadPath);
    const fileUrl = `/uploads/${fileName}`;
    const paper = await PreviousPaper.create({
      title,
      className,
      subject,
      fileUrl,
      uploadedBy: req.user._id,
    });
    res.status(201).json(paper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all previous year papers for a class
// @route   GET /api/previous-papers?className=Class 10
// @access  Student/Teacher
exports.getPapers = async (req, res) => {
  try {
    const { className } = req.query;
    const filter = className ? { className } : {};
    const papers = await PreviousPaper.find(filter).sort({ uploadDate: -1 });
    res.json(papers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
