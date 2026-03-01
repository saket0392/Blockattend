const Session = require("../models/Sessions");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, sessionId, nonce } = req.body;

    if (!studentId || !sessionId || !nonce) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const session = await Session.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!session.isActive) {
      return res.status(403).json({ message: "Session is not active" });
    }

    if (new Date() > session.expiryTime) {
      return res.status(403).json({ message: "Session expired" });
    }

    if (session.nonce !== nonce) {
      return res.status(403).json({ message: "Invalid QR" });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const alreadyMarked = await Attendance.findOne({
      student: student._id,
      session: session._id,
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance already marked" });
    }

    await Attendance.create({
      student: student._id,
      session: session._id,
    });

    student.attendedClasses += 1;
    await student.save();

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.getMyAttendanceHistory = async (req, res) => {
  try {
    const studentId = req.user.id;

    const attendance = await Attendance.find({ student: studentId })
      .populate({
        path: "session",
        select: "subject",
      })
      .sort({ createdAt: -1 });

    const formatted = attendance.map((a) => ({
      _id: a._id,
      date: a.createdAt.toISOString().split("T")[0],
      courseName: a.session.subject,
      status: a.status || "Present",
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to load attendance history" });
  }
};
