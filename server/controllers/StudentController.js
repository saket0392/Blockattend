const Student = require("../models/Student");

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