const { check, validationResult } = require("express-validator");
const User = require("./model");

const userValidator = [
    // Validate name
    check("name")
      .not()
      .isEmpty()
      .withMessage("user name is required.")
      .isLength({ min: 3 })
      .withMessage("user name must be at least 3 characters long.")
      .custom(async (name) => {
        const user = await User.findOne({ where: { name: name } });
        if (user) {
          throw new Error("user name is already in use.");
        }
      })
      .trim(),
    
    // validate BD phone number
    check("phone")
      .not()
      .isEmpty()
      .withMessage("user phone number is required.")
      .isMobilePhone("bn-BD", { strictMode: true })
      .withMessage("Invalid Bangladeshi phone number.")
      .custom(async (phone) => {
        const area = await User.findOne({ where: { phone: phone } });
        if (area) {
          throw new Error("Phone number is already in use.");
        }
      }),


];

// Middleware for handling validation results
const userDataFilterHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Extract and format the validation errors
      const formattedErrors = errors.array().map((error) => ({
        field: error.param,
        message: error.msg,
      }));
  
      return res.status(400).json({
        status: "error",
        message: "Validation failed.",
        errors: formattedErrors,
      });
    }
    next();
};

  
module.exports = {
    userValidator,
    userDataFilterHandler
}