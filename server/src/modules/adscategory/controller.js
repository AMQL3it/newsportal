const adscategoryService = require("./service");
const logger = require("../../utils/logger");

const adscategoryController = {
  // Create a new Tag
  async create(req, res) {
    try {
      // const adscategoryData = req.body;
      const adscategory = await adscategoryService.create(req.body);
      logger.info("New adscategory created successfully.");
      res.status(201).json({
        status: "success",
        message: "New adscategory created successfully.",
        data: adscategory,
      });
    } catch (error) {
      logger.error(`Error creating adscategory: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create adscategory.",
        error: error.message,
      });
    }
  },

  // Get all Adscategories
  async getAll(req, res) {
    try {
      const adscategories = await adscategoryService.getAll();
      res.status(200).json({
        status: "success",
        message: "Adscategories retrieved successfully.",
        data: adscategories,
      });
    } catch (error) {
      logger.error(`Error fetching adscategories: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve adscategories.",
        error: error.message,
      });
    }
  },

  // Get Tag by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const adscategory = await adscategoryService.getById(id);
      if (adscategory) {
        res.status(200).json({
          status: "success",
          message: "Tag retrieved successfully.",
          data: adscategory,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No adscategory found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching adscategory by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve adscategory.",
        error: error.message,
      });
    }
  },

  // Update Tag by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const adscategoryData = req.body;
      const updatedTag = await adscategoryService.update(id, adscategoryData);

      if (updatedTag) {
        logger.info("Tag updated successfully.");
        res.status(200).json({
          status: "success",
          message: "Tag updated successfully.",
          data: updatedTag,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No adscategory found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating adscategory: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update adscategory.",
        error: error.message,
      });
    }
  },

  // Delete Tag by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTag = await adscategoryService.deleteById(id);

      if (deletedTag) {
        res.status(200).json({
          status: "success",
          message: "Tag deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No adscategory found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting adscategory: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete adscategory.",
        error: error.message,
      });
    }
  },
};

module.exports = adscategoryController;
