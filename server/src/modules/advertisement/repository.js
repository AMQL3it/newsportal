const Advertisement = require("./model.js");

const advertisementRepository = {
  // Create a new Advertisement
  async create(data) {
    try {
      const advertisement = await Advertisement.create(data);
      return advertisement;
    } catch (error) {
      console.error("Error creating Advertisement:", error.message);
      throw error;
    }
  },

  // Get all Advertisements
  async getAll() {
    try {
      return await Advertisement.findAll();
    } catch (error) {
      console.error("Error fetching all Advertisements:", error.message);
      throw error;
    }
  },

  // Get Advertisement by ID
  async getById(id) {
    try {
      const advertisement = await Advertisement.findByPk(id);
      if (!advertisement) {
        throw new Error(`Advertisement with ID ${id} not found`);
      }
      return advertisement;
    } catch (error) {
      console.error("Error fetching Advertisement by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const Advertisement = await Advertisement.findOne({ where: query });
      if (!Advertisement) {
        throw new Error(`No Advertisement found matching query: ${JSON.stringify(query)}`);
      }
      return Advertisement;
    } catch (error) {
      console.error("Error fetching Advertisement by query:", error.message);
      throw error;
    }
  },

  // Get Advertisement by Query for multiple results
  // async getAllByQuery(query) {
  //   try {
  //     return await Advertisement.findAll({ where: query });
  //   } catch (error) {
  //     console.error("Error fetching Advertisements by query:", error.message);
  //     throw error;
  //   }
  // },

  // Update Advertisement by ID
  async update(id, data) {
    try {
      const Advertisement = await Advertisement.findByPk(id);
      if (!Advertisement) {
        throw new Error(`Advertisement with ID ${id} not found`);
      }
      return await Advertisement.update(data);
    } catch (error) {
      console.error("Error updating Advertisement:", error.message);
      throw error;
    }
  },

  // Delete Advertisement by ID
  async delete(id) {
    try {
      const Advertisement = await Advertisement.findByPk(id);
      if (!Advertisement) {
        throw new Error(`Advertisement with ID ${id} not found`);
      }
      await Advertisement.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting Advertisement by ID:", error.message);
      throw error;
    }
  },

  // Delete Advertisement by Query
  // async deleteByQuery(query) {
  //   try {
  //     const deletedCount = await Advertisement.destroy({ where: query });
  //     if (deletedCount === 0) {
  //       throw new Error(`No Advertisements found matching query: ${JSON.stringify(query)}`);
  //     }
  //     return deletedCount;
  //   } catch (error) {
  //     console.error("Error deleting Advertisements by query:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Advertisements
  // async deleteAll() {
  //   try {
  //     return await Advertisement.destroy({ truncate: true });
  //   } catch (error) {
  //     console.error("Error deleting all Advertisements:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = advertisementRepository;
