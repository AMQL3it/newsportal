const { check, validationResult } = require("express-validator");
const Area = require("./model");

const areaValidator = [
    // Validate area_name
    check("name")
      .not()
      .isEmpty()
      .withMessage("Area name is required.")
      .isLength({ min: 3 })
      .withMessage("Area name must be at least 3 characters long.")
      .custom(async (area_name) => {
        const area = await Area.findOne({ where: { name: area_name } });
        if (area) {
          throw new Error("Area name is already in use.");
        }
      })
      .trim(),
  
    // Validate area_phone
    // check("phone")
    //   .not()
    //   .isEmpty()
    //   .withMessage("Area phone number is required.")
    //   .isMobilePhone("bn-BD", { strictMode: true })
    //   .withMessage("Invalid Bangladeshi phone number.")
    //   .custom(async (area_phone) => {
    //     const area = await Area.findOne({ where: { phone: area_phone } });
    //     if (area) {
    //       throw new Error("Phone number is already in use.");
    //     }
    //   }),
  
    // Validate area_address
    check("address")
      .not()
      .isEmpty()
      .withMessage("Area address is required.")
      .isLength({ min: 3 })
      .withMessage("Area address must be at least 3 characters long.")
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
const areaDataFilterHandler = (req, res, next) => {
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
    areaValidator,
    areaDataFilterHandler
}