const userService = require("./service");
const logger = require("../../common/logger");

const userController = {
  // Create a new User
  async create(req, res) {
    try {
      // const userData = req.body;
      const user = await userService.create(req.body);
      logger.info("New user created successfully.");
      res.status(201).json({
        status: "success",
        message: "New user created successfully.",
        data: user,
      });
    } catch (error) {
      logger.error(`Error creating user: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create user.",
        error: error.message,
      });
    }
  },

  // Get all Users
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.status(200).json({
        status: "success",
        message: "Users retrieved successfully.",
        data: users,
      });
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve users.",
        error: error.message,
      });
    }
  },

  // Get User by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      if (user) {
        res.status(200).json({
          status: "success",
          message: "User retrieved successfully.",
          data: user,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No user found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching user by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve user.",
        error: error.message,
      });
    }
  },

  // Update User by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await userService.update(id, userData);

      if (updatedUser) {
        logger.info("User updated successfully.");
        res.status(200).json({
          status: "success",
          message: "User updated successfully.",
          data: updatedUser,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No user found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating user: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update user.",
        error: error.message,
      });
    }
  },

  // Delete User by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteById(id);

      if (deletedUser) {
        res.status(200).json({
          status: "success",
          message: "User deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No user found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete user.",
        error: error.message,
      });
    }
  },
};

module.exports = userController;
