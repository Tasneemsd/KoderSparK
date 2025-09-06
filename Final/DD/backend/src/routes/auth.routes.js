// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

// @route   POST /api/auth/register
// @desc    Register user (can be restricted to admin later)
// @access  Public / Admin
router.post('/register', register);

module.exports = router;
