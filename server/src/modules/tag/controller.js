const tagService = require("./service");

const tagController = {
  async create(req, res) {
    try {
      const tag = await tagService.create(req.body);
      res.status(201).json({ status: "success", data: tag });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      // const page = parseInt(req.query.page) || 1;
      // const limit = parseInt(req.query.limit) || 10;
      // const offset = (page - 1) * limit;

      const result = await tagService.getAll();
      res.status(200).json({
        status: "success",
        data: result.data,
        total: result.total,
      });
    } catch (error) {
      console.error("Error in getAllCategories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getById(req, res) {
    try {
      const tag = await tagService.getById(req.params.id);
      if (!tag)
        return res
          .status(404)
          .json({ status: "error", message: "Tag not found" });
      res.status(200).json({ status: "success", data: tag });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async update(req, res) {
    try {
      const tag = await tagService.update(req.params.id, req.body);
      if (!tag)
        return res
          .status(404)
          .json({ status: "error", message: "Tag not found" });
      res.status(200).json({ status: "success", data: tag });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await tagService.deleteById(req.params.id);
      if (!result)
        return res
          .status(404)
          .json({ status: "error", message: "Tag not found" });
      res
        .status(200)
        .json({ status: "success", message: "Tag deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

module.exports = tagController;
