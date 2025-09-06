// src/controllers/events.controller.js
const Event = require('../models/Event.model');

// @desc    Get all events (optionally filter by class)
// @route   GET /api/events
// @access  Public / Student
const getEvents = async (req, res) => {
  const { className } = req.query; // optional query param

  try {
    const filter = className ? { $or: [{ className }, { className: null }] } : {};
    const events = await Event.find(filter).sort({ eventDate: 1 });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getEvents };
