const advertisementRepository = require("./repository");

const advertisementService = {
  // Create a new Advertisement
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("Name is required to create an Advertisement");
      }
      const advertisement = await advertisementRepository.create(data);
      return advertisement;
    } catch (error) {
      console.error("Error in createAdvertisement:", error.message);
      throw error;
    }
  },

  // Get all Advertisements
  async getAll() {
    try {
      const advertisementss = await advertisementRepository.getAll();
      return advertisementss;
    } catch (error) {
      console.error("Error in getAllAdvertisements:", error.message);
      throw error;
    }
  },

  // Get Advertisement by ID
  async getById(id) {
    try {
      if (!id) {
        throw new Error("Advertisement ID is required to fetch the Advertisement");
      }
      const advertisement = await advertisementRepository.getById(id);
      return advertisement;
    } catch (error) {
      console.error("Error in getAdvertisementById:", error.message);
      throw error;
    }
  },

  // Get Advertisements by query
  async getByQuery(query) {
    try {
      const advertisement = await advertisementRepository.getByQuery(query);
      return advertisement;
    } catch (error) {
      console.error("Error in getAdvertisementByQuery:", error.message);
      throw error;
    }
  },

  // Update Advertisement by ID
  async update(id, data) {
    try {
      if (!id) {
        throw new Error("Advertisement ID is required to update the Advertisement");
      }
      if (!data) {
        throw new Error("Update data is required to update the Advertisement");
      }
      const updatedAdvertisement = await advertisementsRepository.update(id, data);
      if (!updatedAdvertisement) {
        throw new Error(`Advertisement with ID ${id} not found for update`);
      }
      return updatedAdvertisement;
    } catch (error) {
      console.error("Error in updateAdvertisement:", error.message);
      throw error;
    }
  },

  // Delete Advertisement by ID
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("Advertisement ID is required to delete the Advertisement");
      }
      const result = await advertisementRepository.delete(id);
      if (!result) {
        throw new Error(`Advertisement with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteAdvertisementById:", error.message);
      throw error;
    }
  },

  // Delete Advertisements by Query
  // async deleteAdvertisementsByQuery(query) {
  //   try {
  //     const deletedCount = await advertisementsRepository.deleteByQuery(query);
  //     return deletedCount; // Return the number of deleted rows
  //   } catch (error) {
  //     console.error("Error in deleteAdvertisementsByQuery:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Advertisements
  // async deleteAllAdvertisements() {
  //   try {
  //     await advertisementsRepository.deleteAll();
  //     return true; // Return true to indicate successful deletion
  //   } catch (error) {
  //     console.error("Error in deleteAllAdvertisements:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = advertisementService;
