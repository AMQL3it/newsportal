const { check } = require("express-validator");
const userService = require("./service");

const userValidator = (isUpdate = false) => [
  // Name validation
  check("name")
    .if((value, { req }) => !isUpdate || req.body.name)
    .notEmpty()
    .withMessage("user name is required.")
    .isLength({ min: 3 })
    .withMessage("user name must be at least 3 characters long.")
    .custom(async (name, { req }) => {
      const user = await userService.getByQuery({ name: name });
      if (user && (!isUpdate || user.id != req.params.id)) {
        throw new Error("user name is already in use.");
      }
    })
    .trim(),

  // Email validation
  check("email")
    .if((value, { req }) => !isUpdate || req.body.email)
    .notEmpty()
    .withMessage("user email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .custom(async (email, { req }) => {
      const user = await userService.getByQuery({ email: email });
      if (user && (!isUpdate || user.id != req.params.id)) {
        throw new Error("user email is already in use.");
      }
    })
    .trim(),

  // Phone validation
  check("phone")
    .if((value, { req }) => !isUpdate || req.body.phone)
    .notEmpty()
    .withMessage("user phone number is required.")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Invalid Bangladeshi phone number.")
    .custom(async (phone, { req }) => {
      const user = await userService.getByQuery({ phone: phone });
      if (user && (!isUpdate || user.id != req.params.id)) {
        throw new Error("Phone number is already in use.");
      }
    }),

  // Password validation
  check("password")
    .if((value, { req }) => !isUpdate || req.body.password)
    .notEmpty()
    .withMessage("user password is required.")
    .isLength({ min: 6 })
    .withMessage("user password must be at least 6 characters long.")
    .trim(),
];

module.exports = userValidator;
