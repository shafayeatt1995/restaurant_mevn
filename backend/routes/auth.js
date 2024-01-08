const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  socialLogin,
} = require("@/backend/controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("@/backend/validation/auth");
const { validation } = require("@/backend/validation");
const passport = require("passport");
require("@/backend/config/passport");

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

router.post("/signup", signupValidation, validation, signup);
router.post("/login", loginValidation, validation, login);
router.get(
  "/social-login/google",
  // passport.authenticate("google", {
  //   scope: [
  //     "https://www.googleapis.com/auth/plus.login",
  //     "https://www.googleapis.com/auth/user.phonenumbers.read",
  //   ],
  // })
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/social-login/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  socialLogin
);
router.get("/logout", logout);

module.exports = router;
