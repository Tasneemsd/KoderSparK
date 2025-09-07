// src/models/Student.model.js
const mongoose = require('mongoose');
const User = require('./User.model');

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    className: {
      type: String, // e.g., "Class 10"
      required: true,
    },
    section: {
      type: String, // e.g., "A"
      required: true,
    },
    attendancePercentage: {
      type: Number,
      default: 0,
    },
    feeDueDate: {
      type: Date,
    },
    schedule: [
      {
        day: String,       // e.g., "Monday"
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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
