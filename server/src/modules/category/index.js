const express = require("express");
const router = express.Router();
const categoryController = require("./controller");

router.post("/", categoryController.create);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

router.patch("/:id/tag", categoryController.addTag);
router.delete("/:id/tag/:tagId", categoryController.removeTag);

module.exports = router;
