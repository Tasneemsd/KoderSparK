// src/models/Event.model.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // e.g., "10:00"
    },
    endTime: {
      type: String, // e.g., "12:00"
    },
    className: {
      type: String, // optional, if the event is for a specific class
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin', // usually an admin creates events
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // optional: track which students are participating
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
