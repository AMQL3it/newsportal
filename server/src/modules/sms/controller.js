const smsService = require("./service");

const smsController = {
  // One to Many controller
  async sendBulkSMS(req, res) {
    const { numbers, message } = req.body;

    if (!Array.isArray(numbers) || !message) {
      return res.status(400).json({ error: "Invalid request format" });
    }

    try {
      const result = await smsService.sendBulkSMS(numbers, message);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Many to Many controller
  async sendMultipleSMS(req, res) {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array required" });
    }

    try {
      const result = await smsService.sendMultipleSMS(messages);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = smsController;
