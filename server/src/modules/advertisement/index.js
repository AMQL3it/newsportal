const express = require("express");
const advertisementController = require("./controller");
// const { advertisementValidator, advertisementDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for Advertisement operations

// Create a new Advertisement
router.post(
  "/", 
  // advertisementValidator, // Validation middleware
  // advertisementDataFilterHandler, // Handles validation errors
  advertisementController.create
);

// Get all Advertisements
router.get("/", advertisementController.getAll);

// Get Advertisement by ID
router.get("/:id", advertisementController.getById);

// Get Advertisements by Query
// router.get("/query", advertisementController.getAllByQuery);

// Update Advertisement by ID
router.put(
  "/:id", 
  // advertisementValidator, // Validation middleware (if applicable for update)
  // advertisementDataFilterHandler, // Handles validation errors
  advertisementController.update
);

// Delete Advertisement by ID
router.delete("/:id", advertisementController.delete);

// Delete Advertisements by Query
// router.delete("/query", advertisementController.deleteByQuery);

// Delete all Advertisements
// router.delete("/all", advertisementController.deleteAll);

module.exports = router;
