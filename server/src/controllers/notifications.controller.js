// src/controllers/notifications.controller.js
const Notification = require('../models/Notification.model');

// @desc    Get notifications for logged-in user
// @route   GET /api/notifications
// @access  All roles
const getNotifications = async (req, res) => {
  const role = req.user.role;
  const userId = req.user._id;

  try {
    const notifications = await Notification.find({
      $or: [
        { recipientRole: 'all' },
        { recipientRole: role, recipientIds: { $in: [userId] } },
      ],
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getNotifications };
