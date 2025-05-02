const userService = require("./service");

const userController = {
  async create(req, res) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      // const page = parseInt(req.query.page) || 1;
      // const limit = parseInt(req.query.limit) || 10;
      // const offset = (page - 1) * limit;
  
      const result = await userService.getAll();
      res.status(200).json({
        status: "success",
        data: result.data,
        total: result.total
      });
    } catch (error) {
      console.error("Error in getAllCategories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getById(req, res) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) return res.status(404).json({ status: "error", message: "User not found" });
      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async update(req, res) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) return res.status(404).json({ status: "error", message: "User not found" });
      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await userService.deleteById(req.params.id);
      if (!result) return res.status(404).json({ status: "error", message: "User not found" });
      res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

module.exports = userController;
