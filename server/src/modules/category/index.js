const express = require("express");
const categoryController = require("./controller");
// const { categoryValidator, categoryDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for Category operations

// Create a new Category
router.post(
  "/", 
  // categoryValidator, // Validation middleware
  // categoryDataFilterHandler, // Handles validation errors
  categoryController.create
);

// Get all Categories
router.get("/", categoryController.getAll);

// Get Category by ID
router.get("/:id", categoryController.getById);

// Get Categories by Query
// router.get("/query", categoryController.getAllByQuery);

// Update Category by ID
router.put(
  "/:id", 
  // categoryValidator, // Validation middleware (if applicable for update)
  // categoryDataFilterHandler, // Handles validation errors
  categoryController.update
);

// Delete Category by ID
router.delete("/:id", categoryController.delete);

// Delete Categories by Query
// router.delete("/query", categoryController.deleteByQuery);

// Delete all Categories
// router.delete("/all", categoryController.deleteAll);

module.exports = router;
