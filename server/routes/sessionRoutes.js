const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { createSession , closeSession } = require("../controllers/sessionController")

router.post("/create", protect, authorize("faculty"), createSession);
router.post("/close", protect, authorize("faculty"), closeSession);

module.exports = router;