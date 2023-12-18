const { check } = require("express-validator");
const { Table } = require("@/backend/models");

const createTableVal = [
  check("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Table name is required")
    .custom(async (value, { req }) => {
      const { restaurantID } = req.user;
      const existingTable = await Table.findOne({ name: value, restaurantID });
      if (existingTable) {
        throw new Error("Table name must be unique");
      }
      return true;
    }),
];

const updateTableVal = [
  check("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Table name is required")
    .custom(async (value, { req }) => {
      try {
        const tableId = req.body._id;
        const { restaurantID } = req.user;

        const existingTable = await Table.findOne({
          name: value,
          restaurantID,
          _id: { $ne: tableId },
        });
        if (existingTable) {
          throw new Error("Table name must be unique");
        }
        return true;
      } catch (error) {
        throw new Error(error?.message || "Error validating table name");
      }
    }),
];

module.exports = { createTableVal, updateTableVal };
