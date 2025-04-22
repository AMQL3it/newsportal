const express = require("express");
const commentController = require("./controller");
// const { commentValidator, commentDataFilterHandler } = require("./middleware");

const router = express.Router();

// Route definitions for Comment operations

// Create a new Comment
router.post(
  "/", 
  // commentValidator, // Validation middleware
  // commentDataFilterHandler, // Handles validation errors
  commentController.create
);

// Get all Comments
router.get("/", commentController.getAll);

// Get Comment by ID
router.get("/:id", commentController.getById);

// Get Comments by Query
// router.get("/query", commentController.getAllByQuery);

// Update Comment by ID
router.put(
  "/:id", 
  // commentValidator, // Validation middleware (if applicable for update)
  // commentDataFilterHandler, // Handles validation errors
  commentController.update
);

// Delete Comment by ID
router.delete("/:id", commentController.delete);

// Delete Comments by Query
// router.delete("/query", commentController.deleteByQuery);

// Delete all Comments
// router.delete("/all", commentController.deleteAll);

module.exports = router;
