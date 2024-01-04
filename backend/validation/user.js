const { check } = require("express-validator");
const { User } = require("@/backend/models");

const createUserVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("type").isLength({ min: 1 }).withMessage("Type required").trim(),
  check("restaurantName")
    .isLength({ min: 1 })
    .withMessage("Restaurant name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim()
    .custom(async (value, { req }) => {
      try {
        if (req.body.type === "manager") {
          if (!value || value.trim().length === 0) {
            throw new Error("Restaurant name required for manager");
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
    .withMessage("Email or phone required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
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
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam"),
];

const restaurantNameVal = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be more than 3 character")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("userID").custom(async (value, { req }) => {
    if (value !== req.user._id) {
      throw new Error("Access denied");
    }

    return true;
  }),
  check("restaurantID").custom(async (value, { req }) => {
    if (value !== req.user.restaurantID) {
      throw new Error("Access denied");
    }

    return true;
  }),
];

const createEmployeeVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("email")
    .isLength({ min: 1 })
    .withMessage("Email or phone required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim()
    .custom(async (value) => {
      try {
        const checkIsUserAllowed = (email) => {
          const admin_emails = new Set(["shafayetalanik@gmail.com"]);
          return admin_emails.has(email);
        };
        const user = await User.findOne({ email: value.toLowerCase() });
        if (user || checkIsUserAllowed(value)) {
          throw new Error("Email or phone already has an account!");
        }
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam"),
];

module.exports = { createUserVal, restaurantNameVal, createEmployeeVal };
