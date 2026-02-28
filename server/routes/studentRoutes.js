const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentAnalytics
} = require("../controllers/StudentController");

router.post("/", createStudent);
router.get("/", getAllStudents);   
router.get("/:id/analytics", getStudentAnalytics);
module.exports = router;