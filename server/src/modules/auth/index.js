const express = require("express");
const router = express.Router();
const authController = require("./controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/otp/send", authController.otpSend);
router.post("/otp/verify", authController.otpVerify);
router.post("/logout", authController.logout);

module.exports = router;
