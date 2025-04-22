const express = require("express");
const userController = require("./controller");
// const { userValidator, userDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for User operations

// Create a new User
router.post(
  "/", 
  // userValidator, // Validation middleware
  // userDataFilterHandler, // Handles validation errors
  userController.create
);

// Get all Users
router.get("/", userController.getAll);

// Get User by ID
router.get("/:id", userController.getById);

// Get Users by Query
// router.get("/query", userController.getAllByQuery);

// Update User by ID
router.put(
  "/:id", 
  // userValidator, // Validation middleware (if applicable for update)
  // userDataFilterHandler, // Handles validation errors
  userController.update
);

// Delete User by ID
router.delete("/:id", userController.delete);

// Delete Users by Query
// router.delete("/query", userController.deleteByQuery);

// Delete all Users
// router.delete("/all", userController.deleteAll);

module.exports = router;
