const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getStudentDashboard,
  getFacultyDashboard,
  getAdminDashboard,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/student", protect, authorize("student"), getStudentDashboard);
router.get("/faculty", protect, authorize("faculty"), getFacultyDashboard);
router.get("/admin", protect, authorize("admin"), getAdminDashboard);

module.exports = router;
