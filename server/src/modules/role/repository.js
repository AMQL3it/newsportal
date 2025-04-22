const Role = require("./model.js");

const roleRepository = {
  // Create a new Role
  async create(data) {
    try {
      const role = await Role.create(data);
      return role;
    } catch (error) {
      console.error("Error creating Role:", error.message);
      throw error;
    }
  },

  // Get all Roles
  async getAll() {
    try {
      return await Role.findAll();
    } catch (error) {
      console.error("Error fetching all Roles:", error.message);
      throw error;
    }
  },

  // Get Role by ID
  async getById(id) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      return role;
    } catch (error) {
      console.error("Error fetching Role by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const Role = await Role.findOne({ where: query });
      if (!Role) {
        throw new Error(`No Role found matching query: ${JSON.stringify(query)}`);
      }
      return Role;
    } catch (error) {
      console.error("Error fetching Role by query:", error.message);
      throw error;
    }
  },

  // Get Role by Query for multiple results
  // async getAllByQuery(query) {
  //   try {
  //     return await Role.findAll({ where: query });
  //   } catch (error) {
  //     console.error("Error fetching Roles by query:", error.message);
  //     throw error;
  //   }
  // },

  // Update Role by ID
  async update(id, data) {
    try {
      const Role = await Role.findByPk(id);
      if (!Role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      return await Role.update(data);
    } catch (error) {
      console.error("Error updating Role:", error.message);
      throw error;
    }
  },

  // Delete Role by ID
  async delete(id) {
    try {
      const Role = await Role.findByPk(id);
      if (!Role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      await Role.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting Role by ID:", error.message);
      throw error;
    }
  },

  // Delete Role by Query
  // async deleteByQuery(query) {
  //   try {
  //     const deletedCount = await Role.destroy({ where: query });
  //     if (deletedCount === 0) {
  //       throw new Error(`No Roles found matching query: ${JSON.stringify(query)}`);
  //     }
  //     return deletedCount;
  //   } catch (error) {
  //     console.error("Error deleting Roles by query:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Roles
  // async deleteAll() {
  //   try {
  //     return await Role.destroy({ truncate: true });
  //   } catch (error) {
  //     console.error("Error deleting all Roles:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = roleRepository;
