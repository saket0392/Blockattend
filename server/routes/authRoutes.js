const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/authController");

const { forgotPassword } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { verify } = require("../controllers/authController");

router.get("/verify", protect, verify);
router.post("/forgot-password", forgotPassword);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protect, logout);

module.exports = router;
