const userRepository = require("./repository");

const userService = {
  // Create a new User
  async create(data) {
    try {
      if (!data.name) {
        throw new Error("Name is required to create an User");
      }
      const user = await userRepository.create(data);
      return user;
    } catch (error) {
      console.error("Error in createUser:", error.message);
      throw error;
    }
  },

  // Get all Users
  async getAll() {
    try {
      const userss = await userRepository.getAll();
      return userss;
    } catch (error) {
      console.error("Error in getAllUsers:", error.message);
      throw error;
    }
  },

  // Get User by ID
  async getById(id) {
    try {
      if (!id) {
        throw new Error("User ID is required to fetch the User");
      }
      const user = await userRepository.getById(id);
      return user;
    } catch (error) {
      console.error("Error in getUserById:", error.message);
      throw error;
    }
  },

  // Get Users by query
  async getByQuery(query) {
    try {
      const user = await userRepository.getByQuery(query);
      return user;
    } catch (error) {
      console.error("Error in getUserByQuery:", error.message);
      throw error;
    }
  },

  // Update User by ID
  async update(id, data) {
    try {
      if (!id) {
        throw new Error("User ID is required to update the User");
      }
      if (!data) {
        throw new Error("Update data is required to update the User");
      }
      const updatedUser = await usersRepository.update(id, data);
      if (!updatedUser) {
        throw new Error(`User with ID ${id} not found for update`);
      }
      return updatedUser;
    } catch (error) {
      console.error("Error in updateUser:", error.message);
      throw error;
    }
  },

  // Delete User by ID
  async deleteById(id) {
    try {
      if (!id) {
        throw new Error("User ID is required to delete the User");
      }
      const result = await userRepository.delete(id);
      if (!result) {
        throw new Error(`User with ID ${id} not found for deletion`);
      }
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Error in deleteUserById:", error.message);
      throw error;
    }
  },

  // Delete Users by Query
  // async deleteUsersByQuery(query) {
  //   try {
  //     const deletedCount = await usersRepository.deleteByQuery(query);
  //     return deletedCount; // Return the number of deleted rows
  //   } catch (error) {
  //     console.error("Error in deleteUsersByQuery:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Users
  // async deleteAllUsers() {
  //   try {
  //     await usersRepository.deleteAll();
  //     return true; // Return true to indicate successful deletion
  //   } catch (error) {
  //     console.error("Error in deleteAllUsers:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = userService;
