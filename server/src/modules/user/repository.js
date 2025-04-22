const User = require("./model.js");

const userRepository = {
  // Create a new User
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.error("Error creating User:", error.message);
      throw error;
    }
  },

  // Get all Users
  async getAll() {
    try {
      return await User.findAll();
    } catch (error) {
      console.error("Error fetching all Users:", error.message);
      throw error;
    }
  },

  // Get User by ID
  async getById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error("Error fetching User by ID:", error.message);
      throw error;
    }
  },

  // Get by Query
  async getByQuery(query) {
    try {
      const User = await User.findOne({ where: query });
      if (!User) {
        throw new Error(`No User found matching query: ${JSON.stringify(query)}`);
      }
      return User;
    } catch (error) {
      console.error("Error fetching User by query:", error.message);
      throw error;
    }
  },

  // Get User by Query for multiple results
  // async getAllByQuery(query) {
  //   try {
  //     return await User.findAll({ where: query });
  //   } catch (error) {
  //     console.error("Error fetching Users by query:", error.message);
  //     throw error;
  //   }
  // },

  // Update User by ID
  async update(id, data) {
    try {
      const User = await User.findByPk(id);
      if (!User) {
        throw new Error(`User with ID ${id} not found`);
      }
      return await User.update(data);
    } catch (error) {
      console.error("Error updating User:", error.message);
      throw error;
    }
  },

  // Delete User by ID
  async delete(id) {
    try {
      const User = await User.findByPk(id);
      if (!User) {
        throw new Error(`User with ID ${id} not found`);
      }
      await User.destroy();
      return true; // Return a success status
    } catch (error) {
      console.error("Error deleting User by ID:", error.message);
      throw error;
    }
  },

  // Delete User by Query
  // async deleteByQuery(query) {
  //   try {
  //     const deletedCount = await User.destroy({ where: query });
  //     if (deletedCount === 0) {
  //       throw new Error(`No Users found matching query: ${JSON.stringify(query)}`);
  //     }
  //     return deletedCount;
  //   } catch (error) {
  //     console.error("Error deleting Users by query:", error.message);
  //     throw error;
  //   }
  // },

  // Delete all Users
  // async deleteAll() {
  //   try {
  //     return await User.destroy({ truncate: true });
  //   } catch (error) {
  //     console.error("Error deleting all Users:", error.message);
  //     throw error;
  //   }
  // },
};

module.exports = userRepository;
