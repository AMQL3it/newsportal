const commentRepository = require("./repository");

const commentService = {
  // Create a new Comment
  async create(data) {
    try {
      const comment = await commentRepository.create(data);
      return comment;
    } catch (error) {
      console.error("Error in createComment:", error.message);
      throw error;
    }
  },

  // Get all Comments
  async getAll() {
    try {
      const commentss = await commentRepository.getAll();
      return commentss;
    } catch (error) {
      console.error("Error in getAllComments:", error.message);
      throw error;
    }
  },

  // Get Comment by ID
  async getById(id) {
    try {
      if (!id) {
        throw new Error("Comment ID is required to fetch the Comment");
      }
      const comment = await commentRepository.getById(id);
      return comment;
    } catch (error) {
      console.error("Error in getCommentById:", error.message);
      throw error;
    }
  },

  // Get Comments by query
  async getByQuery(query) {
    try {
      const comment = await commentRepository.getByQuery(query);
      return comment;
    } catch (error) {
      console.error("Error in getCommentByQuery:", error.message);
      throw error;
    }
  },

  // Update Comment by ID
  async update(id, data) {
    try {
      if (!id) {
        throw new Error("Comment ID is required to update the Comment");
      }
      if (!data) {
        throw new Error("Update data is required to update the Comment");
      }
      const updatedComment = await commentsRepository.update(id, data);
      if (!updatedComment) {
        throw new Error(`Comment with ID ${id} not found for update`);
      }
      return updatedComment;
    } catch (error) {
      console.error("Error in updateComment:", error.message);
      throw error;
    }
  },

  // Delete Comment by ID
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("Comment ID is required to delete the Comment");
      }
      const result = await commentRepository.delete(id);
      if (!result) {
        throw new Error(`Comment with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteCommentById:", error.message);
      throw error;
    }
  },

  // Delete Comments by Query
  // async deleteCommentsByQuery(query) {
  //   try {
  //     const deletedCount = await commentsRepository.deleteByQuery(query);
  //     return deletedCount; // Return the number of deleted rows
  //   } catch (error) {
  //     console.error("Error in deleteCommentsByQuery:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Comments
  // async deleteAllComments() {
  //   try {
  //     await commentsRepository.deleteAll();
  //     return true; // Return true to indicate successful deletion
  //   } catch (error) {
  //     console.error("Error in deleteAllComments:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = commentService;
