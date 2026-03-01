const express = require("express");
const router = express.Router();
const { markAttendance } = require("../controllers/attendanceController");
const {
  getMyAttendanceHistory,
} = require("../controllers/attendanceController");

const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMyAttendanceHistory);
router.post("/mark", markAttendance);

module.exports = router;
