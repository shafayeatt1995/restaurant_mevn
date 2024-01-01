const { check } = require("express-validator");

const createCategoryVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Category name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("image").isLength({ min: 1 }).withMessage(`Image required`),
];

const createSubCategoryVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Sub category name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("categoryID")
    .isLength({ min: 1 })
    .withMessage("Please select a category")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
];

module.exports = { createCategoryVal, createSubCategoryVal };
