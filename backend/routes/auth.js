const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
} = require("@/backend/controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("@/backend/validation/auth");
const { validationHandler } = require("@/backend/validation/validationHandler");

router.post("/signup", signupValidation, validationHandler, signup);
router.post("/login", loginValidation, validationHandler, login);
router.get("/logout", logout);

module.exports = router;
