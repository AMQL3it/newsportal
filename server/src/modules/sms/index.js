const express = require("express");
const router = express.Router();
const smsController = require("./controller");

// One to Many
router.post("/sms/bulk", smsController.sendBulkSMS);

// Many to Many
router.post("/sms/many", smsController.sendMultipleSMS);

module.exports = router;
