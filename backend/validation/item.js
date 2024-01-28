const { check } = require("express-validator");

const createItemVal = [
  check("categoryID").isLength({ min: 1 }).withMessage(`Category required`),
  check("name")
    .isLength({ min: 1 })
    .withMessage("Item name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("image").isLength({ min: 1 }).withMessage(`Image required`),
  check("choices").isArray().withMessage("Choices must be an array"),
  check("addons").isArray().withMessage("Addons must be an array"),
  check("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .isInt({ min: 1 })
    .withMessage("Price couldn't be a non-negative number or a decimal number"),
  check("discount").isBoolean().withMessage("Please select Discount"),
  check("discountAmount").custom((value, { req }) => {
    if (req.body.discount === true) {
      if (value === undefined || value === null || value === "") {
        throw new Error("Discount amount required");
      }
      if (isNaN(value)) {
        throw new Error("Discount amount must be a valid number");
      }
      if (value > +req.body.price) {
        throw new Error("Discount amount cannot be greater than the price");
      }
    }
    return true;
  }),
  check("description")
    .optional()
    .isString()
    .optional()
    .withMessage("Description must be a text"),
  check("estimateTime")
    .optional()
    .isNumeric()
    .withMessage("Estimate time must be a number of minute"),
];

module.exports = { createItemVal };
