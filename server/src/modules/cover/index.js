const express = require("express");
const router = express.Router();
const coverController = require("./controller");

router.post("/", coverController.create);
router.get("/", coverController.getAll);
router.get("/:id", coverController.getById);
router.put("/:id", coverController.update);

module.exports = router;
