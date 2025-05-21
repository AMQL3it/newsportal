const Cover = require("./model.js");

const coverRepository = {
  //   Create a new Role
  async create(data) {
    try {
      const info = await Cover.create(data);
      return info;
    } catch (error) {
      console.error("Error creating Cover:", error.message);
      throw error;
    }
  },

  // Get all Roles
  async getAll() {
    try {
      const result = await Cover.findAll();
      return result;
    } catch (error) {
      console.error("Error fetching all covers:", error.message);
      throw error;
    }
  },

  // Get Role by ID
  async getById(id) {
    try {
      const info = await Cover.findByPk(id);
      if (!info) {
        throw new Error(`Cover info with ID ${id} not found`);
      }
      return info;
    } catch (error) {
      console.error("Error fetching Cover info by ID:", error.message);
      throw error;
    }
  },

  // Update Role by ID
  async update(id, data) {
    try {
      const info = await Cover.findByPk(id);
      if (!info) {
        throw new Error(`Cover info with ID ${id} not found`);
      }
      return await info.update(data);
    } catch (error) {
      console.error("Error updating Cover info:", error.message);
      throw error;
    }
  },
};

module.exports = coverRepository;
