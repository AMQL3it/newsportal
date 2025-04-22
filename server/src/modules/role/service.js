const roleRepository = require("./repository");

const roleService = {
  // Create a new Role
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("Name is required to create an Role");
      }
      const role = await roleRepository.create(data);
      return role;
    } catch (error) {
      console.error("Error in createRole:", error.message);
      throw error;
    }
  },

  // Get all Roles
  async getAll() {
    try {
      const roless = await roleRepository.getAll();
      return roless;
    } catch (error) {
      console.error("Error in getAllRoles:", error.message);
      throw error;
    }
  },

  // Get Role by ID
  async getById(id) {
    try {
      if (!id) {
        throw new Error("Role ID is required to fetch the Role");
      }
      const role = await roleRepository.getById(id);
      return role;
    } catch (error) {
      console.error("Error in getRoleById:", error.message);
      throw error;
    }
  },

  // Get Roles by query
  async getByQuery(query) {
    try {
      const role = await roleRepository.getByQuery(query);
      return role;
    } catch (error) {
      console.error("Error in getRoleByQuery:", error.message);
      throw error;
    }
  },

  // Update Role by ID
  async update(id, data) {
    try {
      if (!id) {
        throw new Error("Role ID is required to update the Role");
      }
      if (!data) {
        throw new Error("Update data is required to update the Role");
      }
      const updatedRole = await rolesRepository.update(id, data);
      if (!updatedRole) {
        throw new Error(`Role with ID ${id} not found for update`);
      }
      return updatedRole;
    } catch (error) {
      console.error("Error in updateRole:", error.message);
      throw error;
    }
  },

  // Delete Role by ID
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("Role ID is required to delete the Role");
      }
      const result = await roleRepository.delete(id);
      if (!result) {
        throw new Error(`Role with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteRoleById:", error.message);
      throw error;
    }
  },

  // Delete Roles by Query
  // async deleteRolesByQuery(query) {
  //   try {
  //     const deletedCount = await rolesRepository.deleteByQuery(query);
  //     return deletedCount; // Return the number of deleted rows
  //   } catch (error) {
  //     console.error("Error in deleteRolesByQuery:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Roles
  // async deleteAllRoles() {
  //   try {
  //     await rolesRepository.deleteAll();
  //     return true; // Return true to indicate successful deletion
  //   } catch (error) {
  //     console.error("Error in deleteAllRoles:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = roleService;
