const postService = require("./service");
const logger = require("../../common/logger");

const postController = {
  // Create a new Post
  async create(req, res) {
    try {
      // const postData = req.body;
      const post = await postService.create(req.body);
      logger.info("New post created successfully.");
      res.status(201).json({
        status: "success",
        message: "New post created successfully.",
        data: post,
      });
    } catch (error) {
      logger.error(`Error creating post: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create post.",
        error: error.message,
      });
    }
  },

  // Get all Posts
  async getAll(req, res) {
    try {
      const posts = await postService.getAll();
      res.status(200).json({
        status: "success",
        message: "Posts retrieved successfully.",
        data: posts,
      });
    } catch (error) {
      logger.error(`Error fetching posts: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve posts.",
        error: error.message,
      });
    }
  },

  // Get Post by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const post = await postService.getById(id);
      if (post) {
        res.status(200).json({
          status: "success",
          message: "Post retrieved successfully.",
          data: post,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No post found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching post by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve post.",
        error: error.message,
      });
    }
  },

  // Update Post by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const postData = req.body;
      const updatedPost = await postService.update(id, postData);

      if (updatedPost) {
        logger.info("Post updated successfully.");
        res.status(200).json({
          status: "success",
          message: "Post updated successfully.",
          data: updatedPost,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No post found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating post: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update post.",
        error: error.message,
      });
    }
  },

  // Delete Post by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedPost = await postService.deleteById(id);

      if (deletedPost) {
        res.status(200).json({
          status: "success",
          message: "Post deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No post found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting post: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete post.",
        error: error.message,
      });
    }
  },
};

module.exports = postController;
