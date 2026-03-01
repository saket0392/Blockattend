const Student = require("../models/Student");
const { getAttendanceAnalytics } = require("../utils/attendanceAnalytics");

exports.createStudent = async (req, res) => {
  try {
    const { name, rollNumber, department } = req.body;

    if (!name || !rollNumber || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.create({
      name,
      rollNumber,
      department,
      totalClasses: 0,
      AttendedClasses: 0
    });

    res.status(201).json(student);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL STUDENTS  👈 OUTSIDE
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
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
      student.AttendedClasses
    );

    res.json({
      studentId: student._id,
      ...analytics
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};