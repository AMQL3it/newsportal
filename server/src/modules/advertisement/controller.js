const advertisementService = require("./service");
const logger = require("../../utils/logger");

const advertisementController = {
  // Create a new Advertisement
  async create(req, res) {
    try {
      // const advertisementData = req.body;
      const advertisement = await advertisementService.create(req.body);
      logger.info("New advertisement created successfully.");
      res.status(201).json({
        status: "success",
        message: "New advertisement created successfully.",
        data: advertisement,
      });
    } catch (error) {
      logger.error(`Error creating advertisement: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to create advertisement.",
        error: error.message,
      });
    }
  },

  // Get all Advertisements
  async getAll(req, res) {
    try {
      const advertisements = await advertisementService.getAll();
      res.status(200).json({
        status: "success",
        message: "Advertisements retrieved successfully.",
        data: advertisements,
      });
    } catch (error) {
      logger.error(`Error fetching advertisements: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve advertisements.",
        error: error.message,
      });
    }
  },

  // Get Advertisement by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const advertisement = await advertisementService.getById(id);
      if (advertisement) {
        res.status(200).json({
          status: "success",
          message: "Advertisement retrieved successfully.",
          data: advertisement,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No advertisement found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error fetching advertisement by ID: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve advertisement.",
        error: error.message,
      });
    }
  },

  // Update Advertisement by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const advertisementData = req.body;
      const updatedAdvertisement = await advertisementService.update(
        id,
        advertisementData
      );

      if (updatedAdvertisement) {
        logger.info("Advertisement updated successfully.");
        res.status(200).json({
          status: "success",
          message: "Advertisement updated successfully.",
          data: updatedAdvertisement,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No advertisement found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error updating advertisement: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to update advertisement.",
        error: error.message,
      });
    }
  },

  // Delete Advertisement by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedAdvertisement = await advertisementService.deleteById(id);

      if (deletedAdvertisement) {
        res.status(200).json({
          status: "success",
          message: "Advertisement deleted successfully.",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `No advertisement found with ID: ${id}`,
        });
      }
    } catch (error) {
      logger.error(`Error deleting advertisement: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Failed to delete advertisement.",
        error: error.message,
      });
    }
  },
};

module.exports = advertisementController;
