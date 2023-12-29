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
  toggleStatusItem,
  updateItemSerial,
} = require("@/backend/controllers/ItemController");

const {
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategorySerial,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  updateSubCategorySerial,
} = require("@/backend/controllers/CategoryController");
const {
  createCategoryVal,
  createSubCategoryVal,
} = require("@/backend/validation/category");

router.use(isManager);
router.get("/item", fetchItem);
router.get("/item/:_id", getItem);
router.post("/item", createItemVal, validation, createItem);
router.patch("/item", createItemVal, validation, updateItem);
router.delete("/item", deleteItem);
router.get("/item/toggle-status/:_id", toggleStatusItem);
router.post("/item/update-serial", updateItemSerial);

router.get("/category", fetchCategory);
router.post("/category", createCategoryVal, validation, createCategory);
router.patch("/category", createCategoryVal, validation, updateCategory);
router.delete("/category", deleteCategory);
router.post("/update-category-serial", updateCategorySerial);

router.post(
  "/sub-category",
  createSubCategoryVal,
  validation,
  createSubCategory
);
router.patch(
  "/sub-category",
  createSubCategoryVal,
  validation,
  updateSubCategory
);
router.delete("/sub-category", deleteSubCategory);
router.post("/update-sub-category-serial", updateSubCategorySerial);

router.get("/table", fetchTable);
router.post("/table", createTableVal, validation, createTable);
router.patch("/table", updateTableVal, validation, updateTable);
router.delete("/table", deleteTable);

router.post(
  "/update-restaurant-name",
  restaurantNameVal,
  validation,
  updateRestaurantName
);

module.exports = router;
