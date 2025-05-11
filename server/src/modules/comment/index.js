const express = require("express");
const commentController = require("./controller");

const router = express.Router();

router.post("/", commentController.create);
router.get("/", commentController.getAll);
router.get("/:id", commentController.getById);
router.put("/:id", commentController.update);
router.delete("/:id", commentController.delete);
// router.delete("/query", commentController.deleteByQuery);
// router.delete("/all", commentController.deleteAll);

module.exports = router;
