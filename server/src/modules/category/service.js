const categoryRepository = require("./repository");

const categoryService = {
  // Create a new Category
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("Name is required to create an Category");
      }
      const category = await categoryRepository.create(data);
      return category;
    } catch (error) {
      console.error("Error in createCategory:", error.message);
      throw error;
    }
  },

  // Get all Categories
  async getAll() {
    try {
      const categories = await categoryRepository.getAll();
      return categories;
    } catch (error) {
      console.error("Error in getAllCategories:", error.message);
      throw error;
    }
  },

  // Get Category by ID
  async getById(id) {
    try {
      if (!id) {
        throw new Error("Category ID is required to fetch the Category");
      }
      const category = await categoryRepository.getById(id);
      return category;
    } catch (error) {
      console.error("Error in getCategoryById:", error.message);
      throw error;
    }
  },

  // Get Categories by query
  async getByQuery(query) {
    try {
      const category = await categoryRepository.getByQuery(query);
      return category;
    } catch (error) {
      console.error("Error in getCategoryByQuery:", error.message);
      throw error;
    }
  },

  // Update Category by ID
  async update(id, data) {
    try {
      if (!id) {
        throw new Error("Category ID is required to update the Category");
      }
      if (!data) {
        throw new Error("Update data is required to update the Category");
      }
      const updatedCategory = await CategoriesRepository.update(id, data);
      if (!updatedCategory) {
        throw new Error(`Category with ID ${id} not found for update`);
      }
      return updatedCategory;
    } catch (error) {
      console.error("Error in updateCategory:", error.message);
      throw error;
    }
  },

  // Delete Category by ID
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("Category ID is required to delete the Category");
      }
      const result = await categoryRepository.delete(id);
      if (!result) {
        throw new Error(`Category with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteCategoryById:", error.message);
      throw error;
    }
  },

  // Delete Categories by Query
  // async deleteCategoriesByQuery(query) {
  //   try {
  //     const deletedCount = await CategoriesRepository.deleteByQuery(query);
  //     return deletedCount; // Return the number of deleted rows
  //   } catch (error) {
  //     console.error("Error in deleteCategoriesByQuery:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Categories
  // async deleteAllCategories() {
  //   try {
  //     await CategoriesRepository.deleteAll();
  //     return true; // Return true to indicate successful deletion
  //   } catch (error) {
  //     console.error("Error in deleteAllCategories:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = categoryService;
