const express = require("express");
const router = express.Router();
const { isManager } = require("@/backend/middleware");
const { createItemVal } = require("@/backend/validation/item");
const { restaurantNameVal } = require("@/backend/validation/user");
const {
  createTableVal,
  updateTableVal,
} = require("@/backend/validation/table");
const { validation } = require("@/backend/validation");
const {
  updateRestaurantName,
} = require("@/backend/controllers/UserController");
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

const {
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategorySerial,
} = require("@/backend/controllers/CategoryController");
const { createCategoryVal } = require("@/backend/validation/category");

router.use(isManager);
router.get("/item", fetchItem);
router.get("/item/:_id", getItem);
router.post("/item", createItemVal, validation, createItem);
router.patch("/item", createItemVal, validation, updateItem);
router.delete("/item", deleteItem);

router.get("/category", fetchCategory);
router.post("/category", createCategoryVal, validation, createCategory);
router.patch("/category", createCategoryVal, validation, updateCategory);
router.delete("/category", deleteCategory);
router.post("/category-serial", updateCategorySerial);

router.get("/table", fetchTable);
router.post("/table", createTableVal, validation, createTable);
router.patch("/table", updateTableVal, validation, updateTable);
router.delete("/table", deleteTable);

router.post("/update-category-serial", updateCategorySerial);
router.post(
  "/update-restaurant-name",
  restaurantNameVal,
  validation,
  updateRestaurantName
);

module.exports = router;
