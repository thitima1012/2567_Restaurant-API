const express = require("express");
const router = express.Router();
const authController = require("../controlles/auth.controller");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
