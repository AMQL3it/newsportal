// const express = require('express');
// const router = express.Router();
// const authController = require('./controller');

// router.post('/login', authController.login);
// router.post('/logout', authController.logout);

// module.exports = router;


// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authService = require("./service");

router.post("/otp/send", async (req, res) => {
  try {
    console.log("Sending OTP... sendloginotp");
    
    const result = await authService.sendLoginOTP(req);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/otp/verify", async (req, res) => {
  try {
    const result = await authService.verifyLoginOTP(req);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const success = await authService.logout(token);
  res.json({ success });
});

module.exports = router;
