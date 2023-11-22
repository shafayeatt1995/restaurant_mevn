const { check } = require("express-validator");
const { User } = require("@/backend/models");

const createUserVal = [
  check("name").isLength({ min: 1 }).withMessage("Name is required").trim(),
  check("type").isLength({ min: 1 }).withMessage("Type is required").trim(),
  check("restaurantName")
    .isLength({ min: 1 })
    .withMessage("Restaurant name is required")
    .custom(async (value, { req }) => {
      try {
        if (req.body.type === "owner") {
          if (!value || value.trim().length === 0) {
            throw new Error("Restaurant name is required for owners");
          }
        } else {
          return true;
        }
      } catch (err) {
        throw new Error(err.message);
      }
    })
    .trim(),
  check("email")
    .isLength({ min: 1 })
    .withMessage("Email or phone is required")
    .trim()
    .custom(async (value) => {
      try {
        const checkIsUserAllowed = (email) => {
          const admin_emails = new Set(["shafayetalanik@gmail.com"]);
          return admin_emails.has(email);
        };
        const user = await User.findOne({ email: value.toLowerCase() });
        if (user || checkIsUserAllowed(value)) {
          throw new Error("Email already is use!");
        }
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

module.exports = { createUserVal };
