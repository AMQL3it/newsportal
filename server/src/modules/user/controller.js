const logger = require("../../utils/logger");
const userService = require("./service");

const userController = {
  async create(req, res) {
    try {
      const user = await userService.create(req.body);
      logger.warning("New user created successfully.");
      res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: user,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const result = await userService.getAll();
      res.json({ success: true, ...result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      logger.warning("User updated successfully.");
      res.json({
        success: true,
        message: "User updated successfully.",
        data: user,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const success = await userService.deleteById(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

module.exports = userController;
