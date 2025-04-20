const areaService = require("./service");
const logger = require("../../common/logger");

const areaController = {
  // Create a new Area
  async create(req, res) {
    try {
      const areaData = req.body;
      const newArea = await areaService.createArea(areaData);
      res.status(201).json({
        status: "success",
        message: "Area created successfully.",
        data: newArea,
      });
    } catch (error) {
      logger.error(`Error creating area: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create area.",
        error: error.message,
      });
    }
  },

  // Get all Areas
  async getAll(req, res) {
    try {
      const areas = await areaService.getAllAreas();
      res.status(200).json({
        status: "success",
        message: "Areas retrieved successfully.",
        data: areas,
      });
    } catch (error) {
      logger.error(`Error fetching areas: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve areas.",
        error: error.message,
      });
    }
  },

  // Get Area by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const area = await areaService.getAreaById(id);
      if (area) {
        res.status(200).json({
          status: "success",
          message: "Area retrieved successfully.",
          data: area,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No area found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching area by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve area.",
        error: error.message,
      });
    }
  },

  // Update Area by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const areaData = req.body;
      const updatedArea = await areaService.updateArea(id, areaData);

      if (updatedArea) {
        res.status(200).json({
          status: "success",
          message: "Area updated successfully.",
          data: updatedArea,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No area found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating area: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update area.",
        error: error.message,
      });
    }
  },

  // Delete Area by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedArea = await areaService.deleteAreaById(id);

      if (deletedArea) {
        res.status(200).json({
          status: "success",
          message: "Area deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No area found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting area: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete area.",
        error: error.message,
      });
    }
  },
};

module.exports = areaController;
