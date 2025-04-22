const tagRepository = require("./repository");

const tagService = {
  // Create a new Tag
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("Name is required to create an Tag");
      }
      const tag = await tagRepository.create(data);
      return tag;
    } catch (error) {
      console.error("Error in createTag:", error.message);
      throw error;
    }
  },

  // Get all Tags
  async getAll() {
    try {
      const tagss = await tagRepository.getAll();
      return tagss;
    } catch (error) {
      console.error("Error in getAllTags:", error.message);
      throw error;
    }
  },

  // Get Tag by ID
  async getById(id) {
    try {
      if (!id) {
        throw new Error("Tag ID is required to fetch the Tag");
      }
      const tag = await tagRepository.getById(id);
      return tag;
    } catch (error) {
      console.error("Error in getTagById:", error.message);
      throw error;
    }
  },

  // Get Tags by query
  async getByQuery(query) {
    try {
      const tag = await tagRepository.getByQuery(query);
      return tag;
    } catch (error) {
      console.error("Error in getTagByQuery:", error.message);
      throw error;
    }
  },

  // Update Tag by ID
  async update(id, data) {
    try {
      if (!id) {
        throw new Error("Tag ID is required to update the Tag");
      }
      if (!data) {
        throw new Error("Update data is required to update the Tag");
      }
      const updatedTag = await tagsRepository.update(id, data);
      if (!updatedTag) {
        throw new Error(`Tag with ID ${id} not found for update`);
      }
      return updatedTag;
    } catch (error) {
      console.error("Error in updateTag:", error.message);
      throw error;
    }
  },

  // Delete Tag by ID
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("Tag ID is required to delete the Tag");
      }
      const result = await tagRepository.delete(id);
      if (!result) {
        throw new Error(`Tag with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteTagById:", error.message);
      throw error;
    }
  },

  // Delete Tags by Query
  // async deleteTagsByQuery(query) {
  //   try {
  //     const deletedCount = await tagsRepository.deleteByQuery(query);
  //     return deletedCount; // Return the number of deleted rows
  //   } catch (error) {
  //     console.error("Error in deleteTagsByQuery:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Tags
  // async deleteAllTags() {
  //   try {
  //     await tagsRepository.deleteAll();
  //     return true; // Return true to indicate successful deletion
  //   } catch (error) {
  //     console.error("Error in deleteAllTags:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = tagService;
