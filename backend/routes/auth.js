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
const { validation } = require("@/backend/validation");

router.post("/signup", signupValidation, validation, signup);
router.post("/login", loginValidation, validation, login);
router.get("/logout", logout);

module.exports = router;
