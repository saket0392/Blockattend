const Session = require("../models/Sessions");
const Student = require("../models/Student");
const { v4: uuidv4 } = require("uuid");

exports.createSession = async (req, res) => {
  try {
    const { subject, facultyName } = req.body;

    if (!subject || !facultyName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sessionId = uuidv4();
    const nonce = uuidv4();

    const expiryTime = new Date(Date.now() + 5 * 60 * 1000); 

    const session = await Session.create({
      sessionId,
      subject,
      facultyName,
      expiryTime,
      nonce,
      isActive: true
    });

    res.status(201).json({
      sessionId: session.sessionId,
      nonce: session.nonce,
      expiryTime: session.expiryTime
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.closeSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!session.isActive) {
      return res.status(400).json({ message: "Session already closed" });
    }

    session.isActive = false;
    await session.save();

    await Student.updateMany({}, { $inc: { totalClasses: 1 } });

    res.status(200).json({ message: "Session closed successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};