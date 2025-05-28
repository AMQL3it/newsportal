const express = require("express");
const router = express.Router();
const userController = require("./controller");
const userValidator = require("./middleware");
const dataFilterHandler = require("../../common/dataFilterHandler");

router.post(
  "/",
  userValidator(false),
  dataFilterHandler,
  userController.create
);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put(
  "/:id",
  // userValidator(true),
  // dataFilterHandler,
  userController.update
);
router.delete("/:id", userController.delete);

module.exports = router;
