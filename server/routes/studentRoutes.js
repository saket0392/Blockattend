const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentAnalytics,
} = require("../controllers/StudentController");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getMyProfile,
  getMyAnalytics,
} = require("../controllers/StudentController");

router.get("/me", protect, getMyProfile);
router.get("/me/analytics", protect, getMyAnalytics);
router.post("/", protect, authorize("student"), createStudent);
router.get("/", protect, authorize("admin"), getAllStudents);
router.get("/:id/analytics", protect, authorize("admin"), getStudentAnalytics);
module.exports = router;
