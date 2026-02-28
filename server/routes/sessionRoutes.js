const express = require("express");
const router = express.Router();
const { createSession , closeSession } = require("../controllers/sessionController")

router.post("/create",createSession);
router.post("/close",closeSession);

module.exports = router;