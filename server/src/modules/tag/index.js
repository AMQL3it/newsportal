const express = require("express");
const router = express.Router();
const tagController = require("./controller");

router.post("/", tagController.create);
router.get("/", tagController.getAll);
router.get("/:id", tagController.getById);
router.put("/:id", tagController.update);
router.delete("/:id", tagController.delete);

module.exports = router;
