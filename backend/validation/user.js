const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User, Restaurant } = require("@/backend/models");

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
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters")
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
        const trimmedStr = value.trim();
        const hasSpace = trimmedStr.length > 0 && !/\s/.test(trimmedStr);
        if (!hasSpace) {
          throw new Error("Don't use space in ID");
        }
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
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam"),
];

const updateEmployeeVal = [
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
    .custom(async (value, { req }) => {
      try {
        const trimmedStr = value.trim();
        const hasSpace = trimmedStr.length > 0 && !/\s/.test(trimmedStr);
        if (!hasSpace) {
          throw new Error("Don't use space in ID");
        }

        const checkIsUserAllowed = (email) => {
          const admin_emails = new Set(["shafayetalanik@gmail.com"]);
          return admin_emails.has(email);
        };

        const { restaurantID, _id } = req.user;
        const matchQuery = {
          email: value.toLowerCase(),
        };
        if (req.body._id) {
          matchQuery._id = { $ne: req.body._id };
        }
        const user = await User.findOne(matchQuery);
        if (user || checkIsUserAllowed(value)) {
          throw new Error("Email or phone already has an account!");
        }

        const restaurant = await Restaurant.findOne({ _id: restaurantID });
        if (!restaurant.waiter.includes(req.body._id)) {
          throw new Error("You can't delete this account!");
        }
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),
  check("password")
    .optional()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam"),
];

const updateProfileVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
];

const createRestaurantVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
];

const updatePasswordVal = [
  check("old")
    .notEmpty()
    .withMessage("Old password is required")
    .isLength({ min: 4 })
    .withMessage("Old password must be at least 4 characters")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ _id: req.user._id }, { password: 1 });
      const check = await bcrypt.compare(value, user.password);
      if (!check) {
        throw new Error("Old password is not correct");
      }
      return true;
    }),
  check("new")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 4 })
    .withMessage("New password must be at least 4 characters")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .custom((value, { req }) => {
      if (value === req.query.old) {
        throw new Error("New password cannot be the same as the old password");
      }
      return true;
    }),
  check("confirm")
    .notEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 4 })
    .withMessage("Confirm password must be at least 4 characters")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .custom((value, { req }) => {
      if (value !== req.query.new) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

module.exports = {
  createUserVal,
  restaurantNameVal,
  createEmployeeVal,
  updateEmployeeVal,
  updateProfileVal,
  updatePasswordVal,
  createRestaurantVal,
};
