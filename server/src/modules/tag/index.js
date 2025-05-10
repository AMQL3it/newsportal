const express = require("express");
const router = express.Router();
const tagController = require("./controller");
const tagValidator = require("./middleware");
const dataFilterHandler = require("../../common/dataFilterHandler");

router.post("/", tagValidator(false), dataFilterHandler, tagController.create);
router.get("/", tagController.getAll);
router.get("/:id", tagController.getById);
router.put("/:id", tagValidator(true), dataFilterHandler, tagController.update);
router.delete("/:id", tagController.delete);

module.exports = router;
