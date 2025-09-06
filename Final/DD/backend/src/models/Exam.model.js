// src/models/Exam.model.js
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    className: {
      type: String, // e.g., "Class 10"
      required: true,
    },
    subject: {
      type: String, // e.g., "Math"
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // e.g., "09:00"
      required: true,
    },
    endTime: {
      type: String, // e.g., "12:00"
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    results: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
          required: true,
        },
        marksObtained: {
          type: Number,
        },
        grade: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
