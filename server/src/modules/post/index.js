const express = require("express");
const router = express.Router();
const postController = require("./controller");
const upload = require("../../utils/multer/upload"); // upload middleware টা import করতে হবে

router.post("/", upload.single("image"), postController.create); // single image field নাম "image"
router.get("/", postController.getAll);
router.get("/category/:id", postController.getAllByCategory);
router.get("/:id", postController.getById);
router.put("/:id", upload.single("image"), postController.update); // Update এও লাগবে
router.put("/:id/state", postController.updateState);
router.delete("/:id", postController.delete);

module.exports = router;
