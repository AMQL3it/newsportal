const adscategoryRepository = require("./repository");

const adscategoryService = {
  // Create a new Adscategory
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("Name is required to create an Adscategory");
      }
      const adscategory = await adscategoryRepository.create(data);
      return adscategory;
    } catch (error) {
      console.error("Error in createAdscategory:", error.message);
      throw error;
    }
  },

  // Get all Adscategories
  async getAll() {
    try {
      const adscategoriess = await adscategoryRepository.getAll();
      return adscategoriess;
    } catch (error) {
      console.error("Error in getAllAdscategories:", error.message);
      throw error;
    }
  },

  // Get Adscategory by ID
  async getById(id) {
    try {
      if (!id) {
        throw new Error("Adscategory ID is required to fetch the Adscategory");
      }
      const adscategory = await adscategoryRepository.getById(id);
      return adscategory;
    } catch (error) {
      console.error("Error in getAdscategoryById:", error.message);
      throw error;
    }
  },

  // Get Adscategories by query
  async getByQuery(query) {
    try {
      const adscategory = await adscategoryRepository.getByQuery(query);
      return adscategory;
    } catch (error) {
      console.error("Error in getAdscategoryByQuery:", error.message);
      throw error;
    }
  },

  // Update Adscategory by ID
  async update(id, data) {
    try {
      if (!id) {
        throw new Error("Adscategory ID is required to update the Adscategory");
      }
      if (!data) {
        throw new Error("Update data is required to update the Adscategory");
      }
      const updatedAdscategory = await adscategoriesRepository.update(id, data);
      if (!updatedAdscategory) {
        throw new Error(`Adscategory with ID ${id} not found for update`);
      }
      return updatedAdscategory;
    } catch (error) {
      console.error("Error in updateAdscategory:", error.message);
      throw error;
    }
  },

  // Delete Adscategory by ID
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("Adscategory ID is required to delete the Adscategory");
      }
      const result = await adscategoryRepository.delete(id);
      if (!result) {
        throw new Error(`Adscategory with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteAdscategoryById:", error.message);
      throw error;
    }
  },

  // Delete Adscategories by Query
  // async deleteAdscategoriesByQuery(query) {
  //   try {
  //     const deletedCount = await adscategoriesRepository.deleteByQuery(query);
  //     return deletedCount; // Return the number of deleted rows
  //   } catch (error) {
  //     console.error("Error in deleteAdscategoriesByQuery:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Adscategories
  // async deleteAllAdscategories() {
  //   try {
  //     await adscategoriesRepository.deleteAll();
  //     return true; // Return true to indicate successful deletion
  //   } catch (error) {
  //     console.error("Error in deleteAllAdscategories:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = adscategoryService;
