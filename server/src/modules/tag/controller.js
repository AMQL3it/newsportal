const tagService = require("./service");
const logger = require("../../common/logger");

const tagController = {
  // Create a new Tag
  async create(req, res) {
    try {
      // const tagData = req.body;
      const tag = await tagService.create(req.body);
      logger.info("New tag created successfully.");
      res.status(201).json({
        status: "success",
        message: "New tag created successfully.",
        data: tag,
      });
    } catch (error) {
      logger.error(`Error creating tag: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create tag.",
        error: error.message,
      });
    }
  },

  // Get all Tags
  async getAll(req, res) {
    try {
      const tags = await tagService.getAll();
      res.status(200).json({
        status: "success",
        message: "Tags retrieved successfully.",
        data: tags,
      });
    } catch (error) {
      logger.error(`Error fetching tags: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve tags.",
        error: error.message,
      });
    }
  },

  // Get Tag by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const tag = await tagService.getById(id);
      if (tag) {
        res.status(200).json({
          status: "success",
          message: "Tag retrieved successfully.",
          data: tag,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No tag found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching tag by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve tag.",
        error: error.message,
      });
    }
  },

  // Update Tag by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const tagData = req.body;
      const updatedTag = await tagService.update(id, tagData);

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
          message: `No tag found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating tag: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update tag.",
        error: error.message,
      });
    }
  },

  // Delete Tag by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTag = await tagService.deleteById(id);

      if (deletedTag) {
        res.status(200).json({
          status: "success",
          message: "Tag deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No tag found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting tag: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete tag.",
        error: error.message,
      });
    }
  },
};

module.exports = tagController;
