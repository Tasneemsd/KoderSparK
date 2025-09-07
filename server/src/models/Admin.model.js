// src/models/Admin.model.js
const mongoose = require('mongoose');
const User = require('./User.model');

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roleDescription: {
      type: String, // e.g., "Principal", "Director", "Account Officer"
    },
    permissions: [
      {
        type: String, // e.g., "manage_students", "manage_teachers", "manage_events"
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
