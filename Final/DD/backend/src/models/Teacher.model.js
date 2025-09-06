// src/models/Teacher.model.js
const mongoose = require('mongoose');
const User = require('./User.model');

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
    classesHandled: [
      {
        className: { type: String, required: true },
        section: { type: String, required: true }
      }
    ],
    schedule: [
      {
        day: String,       // e.g., "Monday"
        className: String, // e.g., "Class 10A"
        subject: String,   // e.g., "Math"
        startTime: String, // e.g., "09:00"
        endTime: String,   // e.g., "10:00"
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
