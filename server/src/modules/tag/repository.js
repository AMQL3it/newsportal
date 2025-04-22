const Tag = require("./model.js");

const tagRepository = {
  // Create a new Tag
  async create(data) {
    try {
      const tag = await Tag.create(data);
      return tag;
    } catch (error) {
      console.error("Error creating Tag:", error.message);
      throw error;
    }
  },

  // Get all Tags
  async getAll() {
    try {
      return await Tag.findAll();
    } catch (error) {
      console.error("Error fetching all Tags:", error.message);
      throw error;
    }
  },

  // Get Tag by ID
  async getById(id) {
    try {
      const tag = await Tag.findByPk(id);
      if (!tag) {
        throw new Error(`Tag with ID ${id} not found`);
      }
      return tag;
    } catch (error) {
      console.error("Error fetching Tag by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const Tag = await Tag.findOne({ where: query });
      if (!Tag) {
        throw new Error(`No Tag found matching query: ${JSON.stringify(query)}`);
      }
      return Tag;
    } catch (error) {
      console.error("Error fetching Tag by query:", error.message);
      throw error;
    }
  },

  // Get Tag by Query for multiple results
  // async getAllByQuery(query) {
  //   try {
  //     return await Tag.findAll({ where: query });
  //   } catch (error) {
  //     console.error("Error fetching Tags by query:", error.message);
  //     throw error;
  //   }
  // },

  // Update Tag by ID
  async update(id, data) {
    try {
      const Tag = await Tag.findByPk(id);
      if (!Tag) {
        throw new Error(`Tag with ID ${id} not found`);
      }
      return await Tag.update(data);
    } catch (error) {
      console.error("Error updating Tag:", error.message);
      throw error;
    }
  },

  // Delete Tag by ID
  async delete(id) {
    try {
      const Tag = await Tag.findByPk(id);
      if (!Tag) {
        throw new Error(`Tag with ID ${id} not found`);
      }
      await Tag.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting Tag by ID:", error.message);
      throw error;
    }
  },

  // Delete Tag by Query
  // async deleteByQuery(query) {
  //   try {
  //     const deletedCount = await Tag.destroy({ where: query });
  //     if (deletedCount === 0) {
  //       throw new Error(`No Tags found matching query: ${JSON.stringify(query)}`);
  //     }
  //     return deletedCount;
  //   } catch (error) {
  //     console.error("Error deleting Tags by query:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Tags
  // async deleteAll() {
  //   try {
  //     return await Tag.destroy({ truncate: true });
  //   } catch (error) {
  //     console.error("Error deleting all Tags:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = tagRepository;
