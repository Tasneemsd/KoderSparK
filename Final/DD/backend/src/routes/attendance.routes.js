const express = require("express");
const router = express.Router();
const teacherAuth = require("../middlewares/teacherAuth.middleware");
const studentAuth = require("../middlewares/studentAuth.middleware");
const adminAuth = require("../middlewares/adminAuth.middleware");
const auth=require("../middlewares/auth.middleware")
const {
  getAttendance,
  markAttendance,
  getAttendanceByStudent,
  getAllAttendance,
} = require("../controllers/attendance.controller");

// @route GET /api/attendance
// @desc Get attendance (students see their own, teachers/admin can filter)
// @access Student / Teacher / Admin
router.get("/", auth, getAttendance);

// @route POST /api/attendance/mark
// @desc Teacher marks student attendance
// @access Teacher
router.post("/mark", teacherAuth, markAttendance);

// @route GET /api/attendance/student/:studentId
// @desc Get attendance records for a specific student
// @access Teacher/Admin
router.get("/student/:studentId", teacherAuth, adminAuth, getAttendanceByStudent);

// @route GET /api/attendance/all
// @desc Admin can view all attendance records
// @access Admin
router.get("/all", adminAuth, getAllAttendance);

module.exports = router;
