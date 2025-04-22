const express = require("express");
const postController = require("./controller");
// const { postValidator, postDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for Post operations

// Create a new Post
router.post(
  "/", 
  // postValidator, // Validation middleware
  // postDataFilterHandler, // Handles validation errors
  postController.create
);

// Get all Posts
router.get("/", postController.getAll);

// Get Post by ID
router.get("/:id", postController.getById);

// Get Posts by Query
// router.get("/query", postController.getAllByQuery);

// Update Post by ID
router.put(
  "/:id", 
  // postValidator, // Validation middleware (if applicable for update)
  // postDataFilterHandler, // Handles validation errors
  postController.update
);

// Delete Post by ID
router.delete("/:id", postController.delete);

// Delete Posts by Query
// router.delete("/query", postController.deleteByQuery);

// Delete all Posts
// router.delete("/all", postController.deleteAll);

module.exports = router;
