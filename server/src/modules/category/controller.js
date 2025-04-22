const categoryService = require("./service");
const logger = require("../../common/logger");

const categoryController = {
  // Create a new Category
  async create(req, res) {
    try {
      // const categoryData = req.body;
      const category = await categoryService.create(req.body);
      logger.info("New category created successfully.");
      res.status(201).json({
        status: "success",
        message: "New category created successfully.",
        data: category,
      });
    } catch (error) {
      logger.error(`Error creating category: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create category.",
        error: error.message,
      });
    }
  },

  // Get all Categories
  async getAll(req, res) {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json({
        status: "success",
        message: "Categories retrieved successfully.",
        data: categories,
      });
    } catch (error) {
      logger.error(`Error fetching Categories: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve Categories.",
        error: error.message,
      });
    }
  },

  // Get Category by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryService.getById(id);
      if (category) {
        res.status(200).json({
          status: "success",
          message: "Category retrieved successfully.",
          data: category,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No category found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching category by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve category.",
        error: error.message,
      });
    }
  },

  // Update Category by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const categoryData = req.body;
      const updatedCategory = await categoryService.update(id, categoryData);

      if (updatedCategory) {
        logger.info("Category updated successfully.");
        res.status(200).json({
          status: "success",
          message: "Category updated successfully.",
          data: updatedCategory,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No category found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating category: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update category.",
        error: error.message,
      });
    }
  },

  // Delete Category by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCategory = await categoryService.deleteById(id);

      if (deletedCategory) {
        res.status(200).json({
          status: "success",
          message: "Category deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No category found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting category: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete category.",
        error: error.message,
      });
    }
  },
};

module.exports = categoryController;
