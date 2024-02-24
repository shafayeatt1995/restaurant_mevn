const { check } = require("express-validator");

const orderVal = [
  check("orderType").notEmpty().withMessage("Order type is required"),
  check("parcelName").custom((value, { req }) => {
    if (req.body.orderType === "Parcel" && !value) {
      throw new Error("Your name is required");
    }
    return true;
  }),
  check("parcelPhone").custom((value, { req }) => {
    if (req.body.orderType === "Parcel" && !value) {
      throw new Error("Your phone number is required ");
    }
    return true;
  }),
  check("parcelAddress").custom((value, { req }) => {
    if (req.body.orderType === "Parcel" && !value) {
      throw new Error("Your address is required for parcel");
    }
    return true;
  }),
];

module.exports = { orderVal };
