const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

const { forgotPassword } = require("../controllers/authController");

router.post("/forgot-password", forgotPassword);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;