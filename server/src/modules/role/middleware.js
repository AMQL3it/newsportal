const { check, validationResult } = require("express-validator");
const Role = require("./model");

const roleValidator = [
    // Validate area_name
    check("name")
      .not()
      .isEmpty()
      .withMessage("role name is required.")
      .isLength({ min: 3 })
      .withMessage("role name must be at least 3 characters long.")
      .custom(async (name) => {
        const role = await Role.findOne({ where: { name: name } });
        if (role) {
          throw new Error("role name is already in use.");
        }
      })
      .trim(),
];

// areaDataFilterHandler = (req, res, next) => {
//     const errors = validationResult(req);
//     const mappedErrors = errors.mapped();

//     if(Object.keys(mappedErrors).length === 0){
//         next();
//     }
//     else{
//         res.status(500).json({
//             errors: mappedErrors
//         });
//     }
// };

// Middleware for handling validation results
const roleDataFilterHandler = (req, res, next) => {
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
    roleValidator,
    roleDataFilterHandler
}