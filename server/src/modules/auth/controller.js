const authService = require("./service");
const userService = require("../user/service");
const loggin = require("../../utils/logger");

const authController = {
  async login(req, res) {
    try {
      const result = await authService.login(req);

      res.status(200).json({
        success: result.success,
        data: result,
        token: result.token,
        message: result.message,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async otpSend(req, res) {
    try {
      const result = await authService.sendLoginOTP(req);
      res.status(200).json({
        success: result.success,
        message: result.message,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async otpVerify(req, res) {
    try {
      const result = await authService.verifyLoginOTP(req);
      res.status(200).json({
        success: result.success,
        // data: result,
        token: result.token,
        message: result.message,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const success = await authService.logout(token);
      res.status(200).json({ success });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async register(req, res) {
    try {
      const result = await userService.create(req.body);
      loggin.info("New post created successfully.");
      res.status(200).json({
        success: result.success,
        data: result,
        message: result.message,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = authController;
