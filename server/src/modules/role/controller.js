const roleService = require("./service");
const logger = require("../../common/logger");

const roleController = {
  // Create a new Role
  async create(req, res) {
    try {
      const roleData = req.body;
      const newRole = await roleService.create(roleData);
      logger.info("Role created successfully.");
      res.status(201).json({
        status: "success",
        message: "Role created successfully.",
        data: newRole,
      });
    } catch (error) {
      logger.error(`Error creating role: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create role.",
        error: error.message,
      });
    }
  },

  // Get all Roles
  async getAll(req, res) {
    try {
      const roles = await roleService.getAll();
      res.status(200).json({
        status: "success",
        message: "Roles retrieved successfully.",
        data: roles,
      });
    } catch (error) {
      logger.error(`Error fetching roles: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve roles.",
        error: error.message,
      });
    }
  },

  // Get Role by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.getById(id);
      if (role) {
        res.status(200).json({
          status: "success",
          message: "Role retrieved successfully.",
          data: role,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No role found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching role by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve role.",
        error: error.message,
      });
    }
  },

  // Update Role by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const roleData = req.body;
      const updatedRole = await roleService.update(id, roleData);

      if (updatedRole) {
        logger.info("Role updated successfully.");
        res.status(200).json({
          status: "success",
          message: "Role updated successfully.",
          data: updatedRole,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No role found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating role: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update role.",
        error: error.message,
      });
    }
  },

  // Delete Role by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedRole = await roleService.deleteById(id);

      if (deletedRole) {
        res.status(200).json({
          status: "success",
          message: "Role deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No role found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting role: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete role.",
        error: error.message,
      });
    }
  },
};

module.exports = roleController;
