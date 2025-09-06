const Attendance = require("../models/Attendance.model");
const Student = require("../models/Student.model");

// @desc Get attendance (student sees own, teacher/admin can filter)
exports.getAttendance = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "student") {
      // student sees only their records
      filter.student = req.user.id;
    } else if (req.user.role === "teacher" && req.query.className) {
      // teacher can filter by className
      filter.className = req.query.className;
    }

    const records = await Attendance.find(filter).populate("student", "name rollNo className");
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance", error: err.message });
  }
};

// @desc Mark attendance (teacher only)
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({ message: "studentId, date and status are required" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if already marked for that date
    const existing = await Attendance.findOne({ student: studentId, date });
    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json({ message: "Attendance updated", attendance: existing });
    }

    // New record
    const attendance = new Attendance({
      student: studentId,
      className: student.className,
      section: student.section,
      date,
      status,
      markedBy: req.user.id,
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance marked", attendance });
  } catch (err) {
    res.status(500).json({ message: "Error marking attendance", error: err.message });
  }
};

// @desc Get attendance for a specific student (teacher/admin)
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const records = await Attendance.find({ student: studentId }).populate("student", "name rollNo className");

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student attendance", error: err.message });
  }
};

// @desc Get all attendance (admin only)
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate("student", "name rollNo className");
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all attendance", error: err.message });
  }
};
