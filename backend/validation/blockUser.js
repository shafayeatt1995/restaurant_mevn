const { check } = require("express-validator");
const { BlockUser, User } = require("@/backend/models");

const createBlockVal = [
  check("email")
    .isLength({ min: 1 })
    .withMessage("Email or id required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim()
    .custom(async (email, { req }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        const { restaurantID } = req.user;
        const block = await BlockUser.findOne({ restaurantID, email });
        if (block) {
          throw new Error("This user already added on the block list");
        }
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),
  check("date").isLength({ min: 1 }).withMessage("Date required"),
];

const updateBlockVal = [
  check("email")
    .isLength({ min: 1 })
    .withMessage("Email or id required")
    .isLength({ max: 100 })
    .withMessage("Don't try to spam")
    .trim()
    .custom(async (email, { req }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        const { restaurantID } = req.user;
        const block = await BlockUser.findOne({
          restaurantID,
          email,
          _id: { $ne: req.body._id },
        });
        if (block) {
          throw new Error("This user already added on the block list");
        }
        return true;
      } catch (error) {
        console.error(error);
        throw new Error(error?.message || "Error validating table name");
      }
    }),
  check("date").isLength({ min: 1 }).withMessage("Date required"),
];

module.exports = { createBlockVal, updateBlockVal };
