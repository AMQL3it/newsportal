const authService = require("./service");

const authController = {
  async login(req, res) {
    try {
      const auth = await authService.login(req);
      res.status(201).json({ status: "success", data: auth });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async logout(req, res) {
    try {
      const auth = await authService.logout(req.body.token);
      res.status(201).json({ status: "success", data: auth });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
};

module.exports = authController;
