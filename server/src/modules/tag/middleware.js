const { check } = require("express-validator");
const tagService = require("./service");

const tagValidator = (isUpdate = false) => [
  // Name validation
  check("name")
    .if((value, { req }) => !isUpdate || req.body.name)
    .notEmpty()
    .withMessage("tag name is required.")
    .isLength({ min: 3 })
    .withMessage("tag name must be at least 3 characters long.")
    .custom(async (name, { req }) => {
      const tag = await tagService.getByQuery({ name: name });
      if (tag && (!isUpdate || tag.id != req.params.id)) {
        throw new Error("tag name is already in use.");
      }
    })
    .trim(),

  // Phone validation
  check("description")
    .if((value, { req }) => !isUpdate || req.body.description)
    .trim(),
];

module.exports = tagValidator;
