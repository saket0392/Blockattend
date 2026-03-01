const Student = require("../models/Student");
const { getAttendanceAnalytics } = require("../utils/attendanceAnalytics");

/**
 * CREATE STUDENT (linked to logged-in user)
 * POST /api/students
 */

exports.createStudent = async (req, res) => {
  try {
    const { name, rollNumber, department } = req.body;

    if (!name || !rollNumber || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // prevent duplicate student for same user
    const existingStudent = await Student.findOne({ user: req.user.id });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student profile already exists" });
    }

    const student = await Student.create({
      user: req.user.id, // ✅ LINK TO USER
      name,
      rollNumber,
      department,
      totalClasses: 0,
      attendedClasses: 0, // ✅ FIXED FIELD NAME
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * GET ALL STUDENTS (admin / debug)
 * GET /api/students
 */
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("user", "email role");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getStudentAnalytics = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const analytics = getAttendanceAnalytics(
      student.totalClasses,
      student.attendedClasses, // ✅ FIXED
    );

    res.json({
      studentId: student._id,
      ...analytics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET LOGGED-IN STUDENT PROFILE
 * GET /api/students/me
 */
exports.getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET LOGGED-IN STUDENT ANALYTICS
 * GET /api/students/me/analytics
 */
exports.getMyAnalytics = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const analytics = getAttendanceAnalytics(
      student.totalClasses,
      student.attendedClasses, // ✅ FIXED
    );

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
