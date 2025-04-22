const Post = require("./model.js");

const postRepository = {
  // Create a new Post
  async create(data) {
    try {
      const post = await Post.create(data);
      return post;
    } catch (error) {
      console.error("Error creating Post:", error.message);
      throw error;
    }
  },

  // Get all Posts
  async getAll() {
    try {
      return await Post.findAll();
    } catch (error) {
      console.error("Error fetching all Posts:", error.message);
      throw error;
    }
  },

  // Get Post by ID
  async getById(id) {
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        throw new Error(`Post with ID ${id} not found`);
      }
      return post;
    } catch (error) {
      console.error("Error fetching Post by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const Post = await Post.findOne({ where: query });
      if (!Post) {
        throw new Error(`No Post found matching query: ${JSON.stringify(query)}`);
      }
      return Post;
    } catch (error) {
      console.error("Error fetching Post by query:", error.message);
      throw error;
    }
  },

  // Get Post by Query for multiple results
  // async getAllByQuery(query) {
  //   try {
  //     return await Post.findAll({ where: query });
  //   } catch (error) {
  //     console.error("Error fetching Posts by query:", error.message);
  //     throw error;
  //   }
  // },

  // Update Post by ID
  async update(id, data) {
    try {
      const Post = await Post.findByPk(id);
      if (!Post) {
        throw new Error(`Post with ID ${id} not found`);
      }
      return await Post.update(data);
    } catch (error) {
      console.error("Error updating Post:", error.message);
      throw error;
    }
  },

  // Delete Post by ID
  async delete(id) {
    try {
      const Post = await Post.findByPk(id);
      if (!Post) {
        throw new Error(`Post with ID ${id} not found`);
      }
      await Post.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting Post by ID:", error.message);
      throw error;
    }
  },

  // Delete Post by Query
  // async deleteByQuery(query) {
  //   try {
  //     const deletedCount = await Post.destroy({ where: query });
  //     if (deletedCount === 0) {
  //       throw new Error(`No Posts found matching query: ${JSON.stringify(query)}`);
  //     }
  //     return deletedCount;
  //   } catch (error) {
  //     console.error("Error deleting Posts by query:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Posts
  // async deleteAll() {
  //   try {
  //     return await Post.destroy({ truncate: true });
  //   } catch (error) {
  //     console.error("Error deleting all Posts:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = postRepository;
