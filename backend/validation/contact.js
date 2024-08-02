const { check } = require("express-validator");

const contactVal = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("email")
    .isLength({ min: 1 })
    .withMessage("Email or ID required")
    .isLength({ min: 11 })
    .withMessage("Put valid email or ID")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim(),
  check("message").isLength({ min: 1 }).withMessage("Message required").trim(),
];

module.exports = { contactVal };
