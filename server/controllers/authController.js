const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function ensureStudentProfile(user, payload = {}) {
  if (user.role !== "student") return;

  const existing = await Student.findOne({ user: user._id });
  if (existing) return;

  await Student.create({
    user: user._id,
    name: user.name,
    rollNumber: payload.rollNumber || payload.crn || `ROLL-${String(user._id).slice(-6)}`,
    department: payload.department || "General",
    totalClasses: 0,
    attendedClasses: 0,
  });
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, rollNumber, department, crn } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await ensureStudentProfile(user, { rollNumber, department, crn });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured on the server",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await ensureStudentProfile(user);

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      token,
      role: user.role,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    console.log("Reset Token:", resetToken);

    res.json({
      message: "Reset token generated (check console)",
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verify = (req, res) => {
  res.status(200).json({
    message: "Token valid",
    user: req.user,
  });
};

exports.logout = (_req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
