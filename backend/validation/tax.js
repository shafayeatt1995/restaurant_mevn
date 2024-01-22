const { check } = require("express-validator");

const taxVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Tax name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("percent").isLength({ min: 1 }).withMessage("Tax percent required"),
];

module.exports = { taxVal };
