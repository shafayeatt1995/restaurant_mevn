const { check, validationResult } = require("express-validator");
const { User } = require("@models");
const bcrypt = require("bcryptjs");

const signupValidation = [
  check("first_name")
    .isLength({ min: 1 })
    .withMessage("First name is required")
    .trim(),

  check("last_name")
    .isLength({ min: 1 })
    .withMessage("Last name is required")
    .trim(),

  check("email")
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const checkIsUserAllowed = (email) => {
          const admin_emails = new Set([
            "vishalbty@gmail.com",
            "beezeaal@gmail.com",
            "admin@footyamigo.com",
            "footyamigo@gmail.com",
            "presidentialideas@gmail.com",
            "kspm7@protonmail.com",
            "daniel@footyamigo.com",
            "shafayetalanik@gmail.com",
          ]);
          return admin_emails.has(email);
        };
        const user = await AffiliateUser.findOne({ email: value });
        if (user || checkIsUserAllowed(value)) {
          throw new Error("Email already is use!");
        }
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  check("affiliate_id")
    .isLength({ min: 1 })
    .withMessage("Affiliate ID is required")
    .isLength({ max: 20 })
    .withMessage(`Affiliate ID should not exceed 20 characters`),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  check("confirm_password")
    .isLength({ min: 8 })
    .withMessage("Confirm password must be at least 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  check("country_code")
    .isLength({ min: 1 })
    .withMessage("Please select a country"),
];

const loginValidation = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value, { req }) => {
      try {
        const user = await AffiliateUser.findOne({ email: value }).select(
          "+password"
        );
        if (user) {
          const check = await bcrypt.compare(req.body.password, user.password);
          if (check) {
            req.user = user;
            req.user_id = user._id;
          } else {
            throw new Error(`Login failed. Invalid credentials.`);
          }
        } else {
          throw new Error(`Login failed. Invalid credentials.`);
        }
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),
];

const changePassword = [
  check("old_password")
    .isLength({ min: 8 })
    .withMessage("Old password must be at least 8 characters")
    .custom(async (value, { req }) => {
      try {
        const user = await AffiliateUser.findOne({
          email: req.affiliate_user.email,
        }).select("+password");
        if (user) {
          const check = await bcrypt.compare(value, user.password);
          if (!check) {
            throw new Error(`Old password not matched`);
          }
        } else {
          throw new Error("Old password not matched");
        }
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  check("new_password")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")
    .custom(async (value, { req }) => {
      try {
        const user = await AffiliateUser.findOne({
          email: req.affiliate_user.email,
        }).select("+password");
        if (user) {
          const checkNewPassword = await bcrypt.compare(
            req.body.new_password,
            user.password
          );
          if (checkNewPassword) {
            throw new Error(`New password can't be the same as old password`);
          }
        }
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  check("confirm_password").custom((value, { req }) => {
    if (value !== req.body.new_password) {
      throw new Error("Password confirmation does not match with new password");
    }
    return true;
  }),
];

const updatePersonalDetails = [
  check("first_name").isLength({ min: 1 }).withMessage(`First name required`),
  check("last_name").isLength({ min: 1 }).withMessage(`Last name required`),
];

const checkEmail = [
  check("email")
    .isLength({ min: 1 })
    .withMessage(`email is required`)
    .isEmail()
    .withMessage("Invalid email address"),
];

const checkPassword = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters"),

  check("confirm_password").custom((value, { req }) => {
    if (value !== req.body.new_password) {
      throw new Error("Password confirmation does not match with new password");
    }
    return true;
  }),
];

const paypalDetails = [
  check("min_threshold")
    .isInt({ min: 100 })
    .withMessage(`Please select minimum payout amount`)
    .isNumeric()
    .withMessage(`Please select minimum payout amount`),
  check("email")
    .isLength({ min: 1 })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("confirm_email")
    .isLength({ min: 1 })
    .withMessage("Confirm email is required")
    .custom((value, { req }) => {
      if (value !== req.body.email) {
        throw new Error("Confirm email is not matched");
      }
      return true;
    }),
];

const bankDetails = [
  check("min_threshold")
    .isNumeric()
    .withMessage(`Please select minimum payout amount`)
    .isInt({ min: 100 })
    .withMessage(`Please select minimum payout amount`),
  check("name")
    .isLength({ min: 1 })
    .withMessage("Account holder name is required"),
  check("address").isLength({ min: 1 }).withMessage("Address is required"),
  check("country_code").isLength({ min: 1 }).withMessage("Country is required"),
  check("iban").isLength({ min: 1 }).withMessage("IBAN is required"),
  check("swift").isLength({ min: 1 }).withMessage("BIC/SWIFT is required"),
];

const cryptoDetails = [
  check("min_threshold")
    .isNumeric()
    .withMessage(`Please select minimum payout amount`)
    .isInt({ min: 100 })
    .withMessage(`Please select minimum payout amount`),
  check("currency").isLength({ min: 1 }).withMessage("currency is required"),
  check("wallet").isLength({ min: 1 }).withMessage("wallet is required"),
];

const validationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(422).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  signupValidation,
  loginValidation,
  changePassword,
  updatePersonalDetails,
  paypalDetails,
  bankDetails,
  checkEmail,
  cryptoDetails,
  checkPassword,
  validationHandler,
};
