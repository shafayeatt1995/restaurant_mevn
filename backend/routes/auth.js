const express = require("express");
const router = express.Router();
const { signup } = require("@/backend/controllers/AuthController");
const {
  signupValidation,
  validationHandler,
} = require("@/backend/validation/auth");
// const AffiliateUserController = require("@backend/controllers/AffiliateUserController");
// const checkAffiliate = require("@backend/middlewares/isAffiliate");
// const {
//   signupValidation,
//   loginValidation,
//   changePassword,
//   updatePersonalDetails,
//   paypalDetails,
//   bankDetails,
//   cryptoDetails,
//   checkEmail,
//   checkPassword,
//   validationHandler,
// } = require("@validation/index");

router.post("/signup", signupValidation, validationHandler, signup);

// router.post(
//   "/login",
//   loginValidation,
//   validationHandler,
//   AffiliateUserController.login
// );

// router.get("/profile", checkAffiliate, AffiliateUserController.getProfile);

// router.get("/logout", checkAffiliate, AffiliateUserController.logout);

// router.patch(
//   "/change-password",
//   checkAffiliate,
//   changePassword,
//   validationHandler,
//   AffiliateUserController.changePassword
// );

// router.patch(
//   "/personal-details",
//   checkAffiliate,
//   updatePersonalDetails,
//   validationHandler,
//   AffiliateUserController.updateProfile
// );

// router.post(
//   "/paypal-details",
//   checkAffiliate,
//   paypalDetails,
//   validationHandler,
//   AffiliateUserController.paypalDetails
// );

// router.post(
//   "/bank-details",
//   checkAffiliate,
//   bankDetails,
//   validationHandler,
//   AffiliateUserController.bankDetails
// );

// router.post(
//   "/crypto-details",
//   checkAffiliate,
//   cryptoDetails,
//   validationHandler,
//   AffiliateUserController.cryptoDetails
// );

// router.get(
//   "/payout-details",
//   checkAffiliate,
//   AffiliateUserController.payoutDetails
// );

// router.post("/check-user", AffiliateUserController.checkUser);

// router.post("/update-link", AffiliateUserController.updateLink);

// router.post(
//   "/update-affiliate-refer",
//   AffiliateUserController.updateAffiliateRefer
// );

// router.get(
//   "/affiliate-dashboard",
//   checkAffiliate,
//   AffiliateUserController.fetchDashboard
// );

// router.get(
//   "/chart-data",
//   checkAffiliate,
//   AffiliateUserController.fetchChartData
// );

// router.get(
//   "/performances",
//   checkAffiliate,
//   AffiliateUserController.fetchPerformance
// );

// router.get("/earnings", checkAffiliate, AffiliateUserController.fetchEarning);

// router.get(
//   "/payment-methods",
//   checkAffiliate,
//   AffiliateUserController.checkPaymentMethod
// );

// router.post(
//   "/promos/:name",
//   checkAffiliate,
//   AffiliateUserController.fetchPromo
// );

// router.post(
//   "/send-reset-link",
//   checkEmail,
//   validationHandler,
//   AffiliateUserController.sendResetLink
// );

// router.post(
//   "/reset-password",
//   checkPassword,
//   AffiliateUserController.resetPassword
// );

// router.post(
//   "/update-notification",
//   checkAffiliate,
//   AffiliateUserController.updateNotification
// );

module.exports = router;
