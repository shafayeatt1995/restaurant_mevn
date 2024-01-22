const { check } = require("express-validator");

const vatVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Vat name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("percent").isLength({ min: 1 }).withMessage("vat percent required"),
];

module.exports = { vatVal };
