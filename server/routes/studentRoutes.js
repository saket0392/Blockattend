const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentAnalytics,
} = require("../controllers/StudentController");
const { protect } = require("../middleware/authMiddleware");
const {
  getMyProfile,
  getMyAnalytics,
} = require("../controllers/StudentController");

router.get("/me", protect, getMyProfile);
router.get("/me/analytics", protect, getMyAnalytics);
router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id/analytics", getStudentAnalytics);
module.exports = router;
