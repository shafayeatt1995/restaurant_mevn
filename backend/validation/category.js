const { check } = require("express-validator");
const { Category } = require("@/backend/models");

const createCategoryVal = [
  check("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category name is required")
    .custom(async (value) => {
      console.log(value);
      const existingCategory = await Category.findOne({ name: value });
      if (existingCategory) {
        throw new Error("Category name must be unique");
      }
      return true;
    }),
  check("image").isLength({ min: 1 }).withMessage(`Image is required`),
];

const updateCategoryVal = [
  check("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category name is required")
    .custom(async (value, { req }) => {
      try {
        const categoryId = req.body._id;

        const existingCategory = await Category.findOne({
          name: value,
          _id: { $ne: categoryId },
        });
        if (existingCategory) {
          console.log(existingCategory ? "true" : "false");
          throw new Error("Category name must be unique");
        }
        return true;
      } catch (error) {
        throw new Error(error?.message || "Error validating category name");
      }
    }),
];

module.exports = { createCategoryVal, updateCategoryVal };
