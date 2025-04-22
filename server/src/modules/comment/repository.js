const Comment = require("./model.js");

const commentRepository = {
  // Create a new Comment
  async create(data) {
    try {
      const comment = await Comment.create(data);
      return comment;
    } catch (error) {
      console.error("Error creating Comment:", error.message);
      throw error;
    }
  },

  // Get all Comments
  async getAll() {
    try {
      return await Comment.findAll();
    } catch (error) {
      console.error("Error fetching all Comments:", error.message);
      throw error;
    }
  },

  // Get Comment by ID
  async getById(id) {
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        throw new Error(`Comment with ID ${id} not found`);
      }
      return comment;
    } catch (error) {
      console.error("Error fetching Comment by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const Comment = await Comment.findOne({ where: query });
      if (!Comment) {
        throw new Error(`No Comment found matching query: ${JSON.stringify(query)}`);
      }
      return Comment;
    } catch (error) {
      console.error("Error fetching Comment by query:", error.message);
      throw error;
    }
  },

  // Get Comment by Query for multiple results
  // async getAllByQuery(query) {
  //   try {
  //     return await Comment.findAll({ where: query });
  //   } catch (error) {
  //     console.error("Error fetching Comments by query:", error.message);
  //     throw error;
  //   }
  // },

  // Update Comment by ID
  async update(id, data) {
    try {
      const Comment = await Comment.findByPk(id);
      if (!Comment) {
        throw new Error(`Comment with ID ${id} not found`);
      }
      return await Comment.update(data);
    } catch (error) {
      console.error("Error updating Comment:", error.message);
      throw error;
    }
  },

  // Delete Comment by ID
  async delete(id) {
    try {
      const Comment = await Comment.findByPk(id);
      if (!Comment) {
        throw new Error(`Comment with ID ${id} not found`);
      }
      await Comment.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting Comment by ID:", error.message);
      throw error;
    }
  },

  // Delete Comment by Query
  // async deleteByQuery(query) {
  //   try {
  //     const deletedCount = await Comment.destroy({ where: query });
  //     if (deletedCount === 0) {
  //       throw new Error(`No Comments found matching query: ${JSON.stringify(query)}`);
  //     }
  //     return deletedCount;
  //   } catch (error) {
  //     console.error("Error deleting Comments by query:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Comments
  // async deleteAll() {
  //   try {
  //     return await Comment.destroy({ truncate: true });
  //   } catch (error) {
  //     console.error("Error deleting all Comments:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = commentRepository;
