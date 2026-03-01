const Session = require("../models/Sessions");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");


function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371e3; 
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

exports.markAttendance = async (req, res) => {
  try {
    const { sessionId, nonce, latitude, longitude } = req.body;

    if (!sessionId || !nonce) {
      return res.status(400).json({ message: "sessionId and nonce are required" });
    }


    // If session enforces geolocation, latitude and longitude must be provided
    const providedGeo = typeof latitude === 'number' && typeof longitude === 'number';
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


    // If session has location/radius set, validate the incoming coordinates
    if (session.location && session.location.lat != null && session.location.lng != null && session.radius) {
      if (!providedGeo) {
        return res.status(400).json({ message: "Location required for this session" });
      }

      const distance = getDistanceInMeters(
        session.location.lat,
        session.location.lng,
        latitude,
        longitude
      );

      if (distance > session.radius) {
        return res.status(403).json({ message: "Outside allowed area for attendance" });
      }
    }

    const student = await Student.findOne({ user: req.user.id });

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
    const student = await Student.findOne({ user: req.user.id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const attendance = await Attendance.find({ student: student._id })
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
  } catch {
    res.status(500).json({ message: "Failed to load attendance history" });
  }
};
