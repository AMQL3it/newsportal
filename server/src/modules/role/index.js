const express = require("express");
const roleController = require("./controller");
const { roleValidator, roleDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for Role operations

// Create a new Role
router.post(
  "/", 
  roleValidator, // Validation middleware
  roleDataFilterHandler, // Handles validation errors
  roleController.create
);

// Get all Roles
router.get("/", roleController.getAll);

// Get Role by ID
router.get("/:id", roleController.getById);

// Get Roles by Query
// router.get("/query", roleController.getAllByQuery);

// Update Role by ID
router.put(
  "/:id", 
  // roleValidator, // Validation middleware (if applicable for update)
  // roleDataFilterHandler, // Handles validation errors
  roleController.update
);

// Delete Role by ID
router.delete("/:id", roleController.delete);

// Delete Roles by Query
// router.delete("/query", roleController.deleteByQuery);

// Delete all Roles
// router.delete("/all", roleController.deleteAll);

module.exports = router;
