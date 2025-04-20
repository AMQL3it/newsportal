const express = require("express");
const areaController = require("./controller");
const { areaValidator, areaDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for Area operations

// Create a new Area
router.post(
  "/", 
  areaValidator, // Validation middleware
  areaDataFilterHandler, // Handles validation errors
  areaController.create
);

// Get all Areas
router.get("/", areaController.getAll);

// Get Area by ID
router.get("/:id", areaController.getById);

// Get Areas by Query
// router.get("/query", areaController.getAllByQuery);

// Update Area by ID
router.put(
  "/:id", 
  // areaValidator, // Validation middleware (if applicable for update)
  // areaDataFilterHandler, // Handles validation errors
  areaController.update
);

// Delete Area by ID
router.delete("/:id", areaController.delete);

// Delete Areas by Query
// router.delete("/query", areaController.deleteByQuery);

// Delete all Areas
// router.delete("/all", areaController.deleteAll);

module.exports = router;
