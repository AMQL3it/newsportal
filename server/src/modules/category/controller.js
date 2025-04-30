const categoryService = require("./service");

const categoryController = {
  async create(req, res) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json({ status: "success", data: category });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      // const page = parseInt(req.query.page) || 1;
      // const limit = parseInt(req.query.limit) || 10;
      // const offset = (page - 1) * limit;
  
      const result = await categoryService.getAll();
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
      const category = await categoryService.getById(req.params.id);
      if (!category) return res.status(404).json({ status: "error", message: "Category not found" });
      res.status(200).json({ status: "success", data: category });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async update(req, res) {
    try {
      const category = await categoryService.update(req.params.id, req.body);
      if (!category) return res.status(404).json({ status: "error", message: "Category not found" });
      res.status(200).json({ status: "success", data: category });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await categoryService.deleteById(req.params.id);
      if (!result) return res.status(404).json({ status: "error", message: "Category not found" });
      res.status(200).json({ status: "success", message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async addTag(req, res) {
    try {
      const result = await categoryService.addTag(req.params.id, req.body.tag_id);
      if (!result) return res.status(404).json({ status: "error", message: "Category not found" });
      res.status(200).json({ status: "success", message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  async removeTag(req, res) {
    try {
      const result = await categoryService.removeTag(req.params.id, req.params.tagId);
      if (!result) return res.status(404).json({ status: "error", message: "Category not found" });
      res.status(200).json({ status: "success", message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

module.exports = categoryController;
