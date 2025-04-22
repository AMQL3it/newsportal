const express = require("express");
const tagController = require("./controller");
// const { tagValidator, tagDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for Tag operations

// Create a new Tag
router.post(
  "/", 
  // tagValidator, // Validation middleware
  // tagDataFilterHandler, // Handles validation errors
  tagController.create
);

// Get all Tags
router.get("/", tagController.getAll);

// Get Tag by ID
router.get("/:id", tagController.getById);

// Get Tags by Query
// router.get("/query", tagController.getAllByQuery);

// Update Tag by ID
router.put(
  "/:id", 
  // tagValidator, // Validation middleware (if applicable for update)
  // tagDataFilterHandler, // Handles validation errors
  tagController.update
);

// Delete Tag by ID
router.delete("/:id", tagController.delete);

// Delete Tags by Query
// router.delete("/query", tagController.deleteByQuery);

// Delete all Tags
// router.delete("/all", tagController.deleteAll);

module.exports = router;
