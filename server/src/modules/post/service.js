const postRepository = require("./repository");

const postService = {
  // Create a new Post
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("Name is required to create an Post");
      }
      const post = await postRepository.create(data);
      return post;
    } catch (error) {
      console.error("Error in createPost:", error.message);
      throw error;
    }
  },

  // Get all Posts
  async getAll() {
    try {
      const postss = await postRepository.getAll();
      return postss;
    } catch (error) {
      console.error("Error in getAllPosts:", error.message);
      throw error;
    }
  },

  // Get Post by ID
  async getById(id) {
    try {
      if (!id) {
        throw new Error("Post ID is required to fetch the Post");
      }
      const post = await postRepository.getById(id);
      return post;
    } catch (error) {
      console.error("Error in getPostById:", error.message);
      throw error;
    }
  },

  // Get Posts by query
  async getByQuery(query) {
    try {
      const post = await postRepository.getByQuery(query);
      return post;
    } catch (error) {
      console.error("Error in getPostByQuery:", error.message);
      throw error;
    }
  },

  // Update Post by ID
  async update(id, data) {
    try {
      if (!id) {
        throw new Error("Post ID is required to update the Post");
      }
      if (!data) {
        throw new Error("Update data is required to update the Post");
      }
      const updatedPost = await postsRepository.update(id, data);
      if (!updatedPost) {
        throw new Error(`Post with ID ${id} not found for update`);
      }
      return updatedPost;
    } catch (error) {
      console.error("Error in updatePost:", error.message);
      throw error;
    }
  },

  // Delete Post by ID
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("Post ID is required to delete the Post");
      }
      const result = await postRepository.delete(id);
      if (!result) {
        throw new Error(`Post with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deletePostById:", error.message);
      throw error;
    }
  },

  // Delete Posts by Query
  // async deletePostsByQuery(query) {
  //   try {
  //     const deletedCount = await postsRepository.deleteByQuery(query);
  //     return deletedCount; // Return the number of deleted rows
  //   } catch (error) {
  //     console.error("Error in deletePostsByQuery:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Posts
  // async deleteAllPosts() {
  //   try {
  //     await postsRepository.deleteAll();
  //     return true; // Return true to indicate successful deletion
  //   } catch (error) {
  //     console.error("Error in deleteAllPosts:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = postService;
