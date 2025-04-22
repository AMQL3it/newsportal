const Category = require("./model.js");

const categoryRepository = {
  // Create a new Category
  async create(data) {
    try {
      const category = await Category.create(data);
      return category;
    } catch (error) {
      console.error("Error creating Category:", error.message);
      throw error;
    }
  },

  // Get all Categories
  async getAll() {
    try {
      return await Category.findAll();
    } catch (error) {
      console.error("Error fetching all Categories:", error.message);
      throw error;
    }
  },

  // Get Category by ID
  async getById(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      console.error("Error fetching Category by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const category = await Category.findOne({ where: query });
      if (!category) {
        throw new Error(`No Category found matching query: ${JSON.stringify(query)}`);
      }
      return category;
    } catch (error) {
      console.error("Error fetching Category by query:", error.message);
      throw error;
    }
  },

  // Get Category by Query for multiple results
  // async getAllByQuery(query) {
  //   try {
  //     return await Category.findAll({ where: query });
  //   } catch (error) {
  //     console.error("Error fetching Categories by query:", error.message);
  //     throw error;
  //   }
  // },

  // Update Category by ID
  async update(id, data) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error(`Category with ID ${id} not found`);
      }
      return await Category.update(data);
    } catch (error) {
      console.error("Error updating Category:", error.message);
      throw error;
    }
  },

  // Delete Category by ID
  async delete(id) {
    try {
      const category = await Category.findByPk(id);
      if (category) {
        throw new Error(`Category with ID ${id} not found`);
      }
      await Category.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting Category by ID:", error.message);
      throw error;
    }
  },

  // Delete Category by Query
  // async deleteByQuery(query) {
  //   try {
  //     const deletedCount = await Category.destroy({ where: query });
  //     if (deletedCount === 0) {
  //       throw new Error(`No Categories found matching query: ${JSON.stringify(query)}`);
  //     }
  //     return deletedCount;
  //   } catch (error) {
  //     console.error("Error deleting Categories by query:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Categories
  // async deleteAll() {
  //   try {
  //     return await Category.destroy({ truncate: true });
  //   } catch (error) {
  //     console.error("Error deleting all Categories:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = categoryRepository;
