const Adscategory = require("./model.js");

const adscategoryRepository = {
  // Create a new Adscategory
  async create(data) {
    try {
      const adscategory = await Adscategory.create(data);
      return adscategory;
    } catch (error) {
      console.error("Error creating Adscategory:", error.message);
      throw error;
    }
  },

  // Get all Adscategories
  async getAll() {
    try {
      return await Adscategory.findAll();
    } catch (error) {
      console.error("Error fetching all Adscategories:", error.message);
      throw error;
    }
  },

  // Get Adscategory by ID
  async getById(id) {
    try {
      const adscategory = await Adscategory.findByPk(id);
      if (!adscategory) {
        throw new Error(`Adscategory with ID ${id} not found`);
      }
      return adscategory;
    } catch (error) {
      console.error("Error fetching Adscategory by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const Adscategory = await Adscategory.findOne({ where: query });
      if (!Adscategory) {
        throw new Error(`No Adscategory found matching query: ${JSON.stringify(query)}`);
      }
      return Adscategory;
    } catch (error) {
      console.error("Error fetching Adscategory by query:", error.message);
      throw error;
    }
  },

  // Get Adscategory by Query for multiple results
  // async getAllByQuery(query) {
  //   try {
  //     return await Adscategory.findAll({ where: query });
  //   } catch (error) {
  //     console.error("Error fetching Adscategories by query:", error.message);
  //     throw error;
  //   }
  // },

  // Update Adscategory by ID
  async update(id, data) {
    try {
      const Adscategory = await Adscategory.findByPk(id);
      if (!Adscategory) {
        throw new Error(`Adscategory with ID ${id} not found`);
      }
      return await Adscategory.update(data);
    } catch (error) {
      console.error("Error updating Adscategory:", error.message);
      throw error;
    }
  },

  // Delete Adscategory by ID
  async delete(id) {
    try {
      const Adscategory = await Adscategory.findByPk(id);
      if (!Adscategory) {
        throw new Error(`Adscategory with ID ${id} not found`);
      }
      await Adscategory.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting Adscategory by ID:", error.message);
      throw error;
    }
  },

  // Delete Adscategory by Query
  // async deleteByQuery(query) {
  //   try {
  //     const deletedCount = await Adscategory.destroy({ where: query });
  //     if (deletedCount === 0) {
  //       throw new Error(`No Adscategories found matching query: ${JSON.stringify(query)}`);
  //     }
  //     return deletedCount;
  //   } catch (error) {
  //     console.error("Error deleting Adscategories by query:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Adscategories
  // async deleteAll() {
  //   try {
  //     return await Adscategory.destroy({ truncate: true });
  //   } catch (error) {
  //     console.error("Error deleting all Adscategories:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = adscategoryRepository;
