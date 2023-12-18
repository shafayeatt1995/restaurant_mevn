const express = require("express");
const router = express.Router();
const { isOwner } = require("@/backend/middleware");
const { createItemVal } = require("@/backend/validation/item");
const {
  createTableVal,
  updateTableVal,
} = require("@/backend/validation/table");
const { validation } = require("@/backend/validation");
const { fetchCategory } = require("@/backend/controllers/CategoryController");
const {
  fetchTable,
  createTable,
  updateTable,
  deleteTable,
} = require("@/backend/controllers/TableController");
const {
  createItem,
  fetchItem,
  getItem,
  updateItem,
  deleteItem,
} = require("@/backend/controllers/ItemController");

router.use(isOwner);
router.get("/category", fetchCategory);
router.get("/item", fetchItem);
router.get("/item/:_id", getItem);
router.post("/item", createItemVal, validation, createItem);
router.patch("/item", createItemVal, validation, updateItem);
router.delete("/item", deleteItem);

router.get("/table", fetchTable);
router.post("/table", createTableVal, validation, createTable);
router.patch("/table", updateTableVal, validation, updateTable);
router.delete("/table", deleteTable);

module.exports = router;
