// src/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Admin = require('../models/Admin.model');
const Teacher = require('../models/Teacher.model');
const Student = require('../models/Student.model');
const { JWT_SECRET, TOKEN_EXPIRY } = require('../config/keys.config');

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public/Admin
const register = async (req, res) => {
  const { name, email, password, role, contactNumber } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create base user
    const user = await User.create({
      name,
      email,
      password,
      role,
      contactNumber,
    });

    // Role-specific document
    if (role === 'admin') {
      await Admin.create({
        user: user._id,
        roleDescription: req.body.roleDescription,
        permissions: req.body.permissions || [],
      });
    }

    if (role === 'teacher') {
      await Teacher.create({
        user: user._id,
        subjects: req.body.subjects || [],
        classesHandled: req.body.classesHandled || [],
        schedule: req.body.schedule || [],
      });
    }

    if (role === 'student') {
      await Student.create({
        user: user._id,
        name: user.name,
        rollNumber: req.body.rollNumber,
        className: req.body.className,
        section: req.body.section,
        attendancePercentage: req.body.attendancePercentage || 0,
        feeDueDate: req.body.feeDueDate,
        schedule: req.body.schedule || [],
      });
    }

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, register };
