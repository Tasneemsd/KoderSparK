// src/models/PreviousPaper.model.js
const mongoose = require('mongoose');

const previousPaperSchema = new mongoose.Schema(
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
    fileUrl: {
      type: String, // link to the uploaded file (could be S3, local storage, etc.)
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const PreviousPaper = mongoose.model('PreviousPaper', previousPaperSchema);

module.exports = PreviousPaper;
