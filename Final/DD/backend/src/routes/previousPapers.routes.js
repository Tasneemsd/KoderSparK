// src/routes/previousPapers.routes.js
const express = require('express');
const router = express.Router();
const { uploadPaper, getPapers } = require('../controllers/previousPapers.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const teacherAuth = require('../middlewares/teacherAuth.middleware');

// Upload previous year paper (teacher only)
router.post('/', authMiddleware, teacherAuth, uploadPaper);
// Get previous year papers (all roles)
router.get('/', authMiddleware, getPapers);

module.exports = router;
