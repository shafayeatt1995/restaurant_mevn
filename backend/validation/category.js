const { check } = require("express-validator");

const createCategoryVal = [
  check("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category name is required"),
  check("image").isLength({ min: 1 }).withMessage(`Image is required`),
];

module.exports = { createCategoryVal };
