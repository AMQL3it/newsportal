const commentService = require("./service");
const logger = require("../../utils/logger");

const commentController = {
  // Create a new Comment
  async create(req, res) {
    try {
      // const commentData = req.body;
      const comment = await commentService.create(req.body);
      logger.info("New comment created successfully.");
      res.status(201).json({
        status: "success",
        message: "New comment created successfully.",
        data: comment,
      });
    } catch (error) {
      logger.error(`Error creating comment: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create comment.",
        error: error.message,
      });
    }
  },

  // Get all Comments
  async getAll(req, res) {
    try {
      const comments = await commentService.getAll();
      res.status(200).json({
        status: "success",
        message: "Comments retrieved successfully.",
        data: comments,
      });
    } catch (error) {
      logger.error(`Error fetching comments: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve comments.",
        error: error.message,
      });
    }
  },

  // Get Comment by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const comment = await commentService.getById(id);
      if (comment) {
        res.status(200).json({
          status: "success",
          message: "Comment retrieved successfully.",
          data: comment,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No comment found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching comment by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve comment.",
        error: error.message,
      });
    }
  },

  // Update Comment by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const commentData = req.body;
      const updatedComment = await commentService.update(id, commentData);

      if (updatedComment) {
        logger.info("Comment updated successfully.");
        res.status(200).json({
          status: "success",
          message: "Comment updated successfully.",
          data: updatedComment,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No comment found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating comment: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update comment.",
        error: error.message,
      });
    }
  },

  // Delete Comment by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedComment = await commentService.deleteById(id);

      if (deletedComment) {
        res.status(200).json({
          status: "success",
          message: "Comment deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No comment found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting comment: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete comment.",
        error: error.message,
      });
    }
  },
};

module.exports = commentController;
