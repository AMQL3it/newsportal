const areaRepository = require("./repository");

const areaService = {
  // Create a new Area
  async createArea(data) {
    try {
      if (!data.name) {
        throw new Error("Name is required to create an Area");
      }
      const area = await areaRepository.create(data);
      return area;
    } catch (error) {
      console.error("Error in createArea:", error.message);
      throw error;
    }
  },

  // Get all Areas
  async getAllAreas() {
    try {
      const areas = await areaRepository.getAll();
      return areas;
    } catch (error) {
      console.error("Error in getAllAreas:", error.message);
      throw error;
    }
  },

  // Get Area by ID
  async getAreaById(id) {
    try {
      if (!id) {
        throw new Error("Area ID is required to fetch the Area");
      }
      const area = await areaRepository.getById(id);
      return area;
    } catch (error) {
      console.error("Error in getAreaById:", error.message);
      throw error;
    }
  },

  // Get Areas by query
  async getAreasByQuery(query) {
    try {
      const areas = await areaRepository.getAllByQuery(query);
      return areas;
    } catch (error) {
      console.error("Error in getAreasByQuery:", error.message);
      throw error;
    }
  },

  // Update Area by ID
  async updateArea(id, data) {
    try {
      if (!id) {
        throw new Error("Area ID is required to update the Area");
      }
      if (!data) {
        throw new Error("Update data is required to update the Area");
      }
      const updatedArea = await areaRepository.update(id, data);
      if (!updatedArea) {
        throw new Error(`Area with ID ${id} not found for update`);
      }
      return updatedArea;
    } catch (error) {
      console.error("Error in updateArea:", error.message);
      throw error;
    }
  },

  // Delete Area by ID
  async deleteAreaById(id) {
    try {
      if (!id) {
        throw new Error("Area ID is required to delete the Area");
      }
      const result = await areaRepository.delete(id);
      if (!result) {
        throw new Error(`Area with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteAreaById:", error.message);
      throw error;
    }
  },

  // Delete Areas by Query
  async deleteAreasByQuery(query) {
    try {
      const deletedCount = await areaRepository.deleteByQuery(query);
      return deletedCount; // Return the number of deleted rows
    } catch (error) {
      console.error("Error in deleteAreasByQuery:", error.message);
      throw error;
    }
  },

  // Delete all Areas
  async deleteAllAreas() {
    try {
      await areaRepository.deleteAll();
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteAllAreas:", error.message);
      throw error;
    }
  },
};

module.exports = areaService;
