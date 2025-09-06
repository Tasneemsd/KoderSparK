// src/controllers/announcements.controller.js
const Announcement = require('../models/Announcement.model');
const User = require('../models/User.model');

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Admin
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, audience } = req.body;
    const createdBy = req.user._id;
    const announcement = await Announcement.create({
      title,
      message,
      audience: audience || 'all',
      createdBy,
    });
    res.status(201).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all announcements (for teachers/students)
// @route   GET /api/announcements
// @access  Teacher/Student/Admin
exports.getAnnouncements = async (req, res) => {
  try {
    const role = req.user.role;
    let filter = { $or: [ { audience: 'all' }, { audience: role + 's' } ] };
    const announcements = await Announcement.find(filter).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
