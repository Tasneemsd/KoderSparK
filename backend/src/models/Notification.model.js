// src/models/Notification.model.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    recipientRole: {
      type: String,
      enum: ['student', 'teacher', 'admin', 'all'],
      default: 'all',
    },
    recipientIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'recipientRole', // references Student, Teacher, or Admin
      },
    ],
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin', // usually an admin sends notifications
      required: true,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'recipientRole',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
