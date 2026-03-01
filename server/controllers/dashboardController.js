const Student = require("../models/Student");
const Session = require("../models/Sessions");
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const { getAttendanceAnalytics } = require("../utils/attendanceAnalytics");

exports.getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const analytics = getAttendanceAnalytics(
      student.totalClasses,
      student.attendedClasses,
      Math.max(0, 100 - student.totalClasses),
    );

    const recentAttendance = await Attendance.find({ student: student._id })
      .populate({ path: "session", select: "subject startTime" })
      .sort({ createdAt: -1 })
      .limit(5);

    const absentClasses = Math.max(0, student.totalClasses - student.attendedClasses);

    return res.json({
      student: {
        id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        department: student.department,
      },
      metrics: {
        totalClasses: student.totalClasses,
        attendedClasses: student.attendedClasses,
        missedClasses: absentClasses,
        attendancePercentage: analytics.percentage,
        status: analytics.status,
        requiredToReach75: analytics.requiredToReach75,
      },
      recentAttendance: recentAttendance.map((item) => ({
        id: item._id,
        status: item.status,
        markedAt: item.createdAt,
        subject: item.session?.subject || "Unknown",
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch student dashboard", error: error.message });
  }
};

exports.getFacultyDashboard = async (req, res) => {
  try {
    const sessions = await Session.find({ facultyId: req.user.id }).sort({ createdAt: -1 });

    const sessionIds = sessions.map((s) => s._id);
    const attendanceDocs = await Attendance.find({ session: { $in: sessionIds } }).populate("student", "department");

    const uniqueStudents = new Set(attendanceDocs.map((doc) => String(doc.student?._id)).filter(Boolean));

    const todaysClasses = sessions.filter((session) => {
      const now = new Date();
      const createdAt = new Date(session.createdAt);
      return createdAt.toDateString() === now.toDateString();
    }).length;

    const departmentDistribution = attendanceDocs.reduce((acc, doc) => {
      const dept = doc.student?.department || "Unknown";
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    return res.json({
      metrics: {
        totalSessions: sessions.length,
        activeSessions: sessions.filter((s) => s.isActive).length,
        totalStudentsMarked: uniqueStudents.size,
        todaysClasses,
      },
      recentSessions: sessions.slice(0, 5).map((session) => ({
        id: session.sessionId,
        subject: session.subject,
        isActive: session.isActive,
        startTime: session.startTime,
        expiryTime: session.expiryTime,
      })),
      departmentDistribution,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch faculty dashboard", error: error.message });
  }
};

exports.getAdminDashboard = async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    const analyticsRows = students.map((student) => {
      const analytics = getAttendanceAnalytics(
        student.totalClasses,
        student.attendedClasses,
        Math.max(0, 100 - student.totalClasses),
      );

      return {
        studentId: student._id,
        name: student.name,
        department: student.department,
        totalClasses: student.totalClasses,
        attendedClasses: student.attendedClasses,
        ...analytics,
      };
    });

    const totalUsers = await User.countDocuments();
    const totalFaculty = await User.countDocuments({ role: "faculty" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const summary = {
      totalUsers,
      totalStudents: students.length,
      totalFaculty,
      totalAdmins,
      safeCount: analyticsRows.filter((a) => a.status === "SAFE").length,
      riskCount: analyticsRows.filter((a) => a.status === "RISK").length,
      dangerCount: analyticsRows.filter((a) => a.status === "DANGER").length,
      averageAttendance:
        analyticsRows.length > 0
          ? Number((analyticsRows.reduce((sum, row) => sum + row.percentage, 0) / analyticsRows.length).toFixed(2))
          : 0,
    };

    const departmentMap = analyticsRows.reduce((acc, row) => {
      if (!acc[row.department]) {
        acc[row.department] = { count: 0, attendanceSum: 0 };
      }

      acc[row.department].count += 1;
      acc[row.department].attendanceSum += row.percentage;
      return acc;
    }, {});

    const departmentAverages = Object.entries(departmentMap).map(([department, values]) => ({
      department,
      averageAttendance: Number((values.attendanceSum / values.count).toFixed(2)),
      studentCount: values.count,
    }));

    return res.json({
      summary,
      departmentAverages,
      students: analyticsRows,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch admin dashboard", error: error.message });
  }
};
