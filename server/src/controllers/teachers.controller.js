// src/controllers/teachers.controller.js
const Teacher = require('../models/Teacher.model');
const Student = require('../models/Student.model');
const Attendance = require('../models/Attendance.model');
const Report = require('../models/Report.model');
const Exam = require('../models/Exam.model');
const PreviousPaper = require('../models/PreviousPaper.model');
const Event = require('../models/Event.model');

// @desc    Get teacher dashboard info
// @route   GET /api/teachers/dashboard
// @access  Teacher
const getDashboard = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id }).populate('user');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    // Upcoming classes (next 5)
    const upcomingClasses = teacher.schedule
      .sort((a, b) => new Date(`1970/01/01 ${a.startTime}`) - new Date(`1970/01/01 ${b.startTime}`))
      .slice(0, 5);

    res.json({
      name: teacher.user.name,
      subjects: teacher.subjects,
      classesHandled: teacher.classesHandled,
      upcomingClasses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark attendance for a student
// @route   POST /api/teachers/attendance
// @access  Teacher
const markAttendance = async (req, res) => {
  const { studentId, date, status, remarks } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const attendance = await Attendance.create({
      student: student._id,
      className: student.className,
      section: student.section,
      date,
      status,
      remarks,
      markedBy: req.user._id,
    });

    // Optionally, update student's attendancePercentage here

    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add or update student report
// @route   POST /api/teachers/reports
// @access  Teacher
const addReport = async (req, res) => {
  const { studentId, subject, marks, maxMarks, grade, remarks, examDate } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const report = await Report.create({
      student: student._id,
      teacher: req.user._id,
      subject,
      marks,
      maxMarks,
      grade,
      remarks,
      examDate,
    });

    res.status(201).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get teacher's students
// @route   GET /api/teachers/students
// @access  Teacher
const getStudents = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    const students = await Student.find({ className: { $in: teacher.classesHandled } }).populate('user');

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Upload previous paper
// @route   POST /api/teachers/previous-papers
// @access  Teacher
const uploadPreviousPaper = async (req, res) => {
  const { title, className, subject, fileUrl } = req.body;

  try {
    const paper = await PreviousPaper.create({
      title,
      className,
      subject,
      fileUrl,
      uploadedBy: req.user._id,
    });

    res.status(201).json(paper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get upcoming exams for teacher's classes
// @route   GET /api/teachers/exams
// @access  Teacher
const getExams = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    const exams = await Exam.find({ className: { $in: teacher.classesHandled } }).sort({ date: 1 });

    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboard,
  markAttendance,
  addReport,
  getStudents,
  uploadPreviousPaper,
  getExams,
};
