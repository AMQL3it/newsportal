const Area = require("./model.js");

const areaRepository = {
  // Create a new Area
  async create(data) {
    try {
      const newArea = await Area.create(data);
      return newArea;
    } catch (error) {
      console.error("Error creating Area:", error.message);
      throw error;
    }
  },

  // Get all Areas
  async getAll() {
    try {
      return await Area.findAll();
    } catch (error) {
      console.error("Error fetching all Areas:", error.message);
      throw error;
    }
  },

  // Get Area by ID
  async getById(id) {
    try {
      const area = await Area.findByPk(id);
      if (!area) {
        throw new Error(`Area with ID ${id} not found`);
      }
      return area;
    } catch (error) {
      console.error("Error fetching Area by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const area = await Area.findOne({ where: query });
      if (!area) {
        throw new Error(`No Area found matching query: ${JSON.stringify(query)}`);
      }
      return area;
    } catch (error) {
      console.error("Error fetching Area by query:", error.message);
      throw error;
    }
  },

  // Get Area by Query for multiple results
  async getAllByQuery(query) {
    try {
      return await Area.findAll({ where: query });
    } catch (error) {
      console.error("Error fetching Areas by query:", error.message);
      throw error;
    }
  },

  // Update Area by ID
  async update(id, data) {
    try {
      const area = await Area.findByPk(id);
      if (!area) {
        throw new Error(`Area with ID ${id} not found`);
      }
      return await area.update(data);
    } catch (error) {
      console.error("Error updating Area:", error.message);
      throw error;
    }
  },

  // Delete Area by ID
  async delete(id) {
    try {
      const area = await Area.findByPk(id);
      if (!area) {
        throw new Error(`Area with ID ${id} not found`);
      }
      await area.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting Area by ID:", error.message);
      throw error;
    }
  },

  // Delete Area by Query
  async deleteByQuery(query) {
    try {
      const deletedCount = await Area.destroy({ where: query });
      if (deletedCount === 0) {
        throw new Error(`No Areas found matching query: ${JSON.stringify(query)}`);
      }
      return deletedCount;
    } catch (error) {
      console.error("Error deleting Areas by query:", error.message);
      throw error;
    }
  },

  // Delete all Areas
  async deleteAll() {
    try {
      return await Area.destroy({ truncate: true });
    } catch (error) {
      console.error("Error deleting all Areas:", error.message);
      throw error;
    }
  },
};

module.exports = areaRepository;
