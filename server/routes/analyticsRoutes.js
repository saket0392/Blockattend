const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const { getAttendanceAnalytics } = require("../utils/attendanceAnalytics");

router.get("/:id/analytics", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const totalClasses = student.totalClasses;
    const attendedClasses = student.attendedClasses;

    const analytics = getAttendanceAnalytics(
      totalClasses,
      attendedClasses,
      remainingClasses = 100 - totalClasses,
    );

    res.json({
      studentId: student._id,
      ...analytics
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;