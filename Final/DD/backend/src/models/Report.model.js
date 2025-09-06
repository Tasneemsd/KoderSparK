// src/models/Report.model.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    subject: {
      type: String, // e.g., "Math"
      required: true,
    },
    marks: {
      type: Number,
    },
    maxMarks: {
      type: Number,
    },
    grade: {
      type: String, // e.g., "A+", "B"
    },
    remarks: {
      type: String, // academic or behavioral remarks
    },
    examDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
