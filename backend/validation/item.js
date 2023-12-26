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
  check("ingredient").isArray().withMessage("Ingredients must be an array"),
  check("variant").isArray().withMessage("Variant must be an array"),
  check("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .isInt({ min: 0 })
    .withMessage("Price must be a non-negative number"),
  check("discount").isBoolean().withMessage("Please select Discount"),
  check("discountAmount").custom((value, { req }) => {
    if (req.body.discount === true) {
      if (value === undefined || value === null || value === "") {
        throw new Error("Discount amount required when discount is selected");
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
  check("status").isBoolean().withMessage("Status required"),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a text"),
  check("estimateTime")
    .isLength({ min: 1 })
    .withMessage("Estimate time required"),
];

module.exports = { createItemVal };
