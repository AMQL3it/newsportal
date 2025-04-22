const express = require("express");
const adscategoryController = require("./controller");
// const { adscategoryValidator, adscategoryDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for Adscategory operations

// Create a new Adscategory
router.post(
  "/", 
  // adscategoryValidator, // Validation middleware
  // adscategoryDataFilterHandler, // Handles validation errors
  adscategoryController.create
);

// Get all Adscategories
router.get("/", adscategoryController.getAll);

// Get Adscategory by ID
router.get("/:id", adscategoryController.getById);

// Get Adscategories by Query
// router.get("/query", adscategoryController.getAllByQuery);

// Update Adscategory by ID
router.put(
  "/:id", 
  // adscategoryValidator, // Validation middleware (if applicable for update)
  // adscategoryDataFilterHandler, // Handles validation errors
  adscategoryController.update
);

// Delete Adscategory by ID
router.delete("/:id", adscategoryController.delete);

// Delete Adscategories by Query
// router.delete("/query", adscategoryController.deleteByQuery);

// Delete all Adscategories
// router.delete("/all", adscategoryController.deleteAll);

module.exports = router;
