const express = require("express");
const router = express.Router();
const { isManager } = require("@/backend/middleware");
const { createItemVal } = require("@/backend/validation/item");
const { vatVal } = require("@/backend/validation/vat");
const {
  restaurantNameVal,
  createEmployeeVal,
  updateEmployeeVal,
} = require("@/backend/validation/user");
const {
  createTableVal,
  updateTableVal,
} = require("@/backend/validation/table");
const {
  createBlockVal,
  updateBlockVal,
} = require("@/backend/validation/blockUser");
const { validation } = require("@/backend/validation");
const {
  updateRestaurantName,
  fetchEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchDashboard,
  updatePrintingDetails,
} = require("@/backend/controllers/UserController");
const {
  fetchTable,
  createTable,
  updateTable,
  deleteTable,
} = require("@/backend/controllers/TableController");
const {
  fetchBlockUser,
  createBlockUser,
  updateBlockUser,
  deleteBlockUser,
} = require("@/backend/controllers//BlockUserController");
const {
  createItem,
  fetchItem,
  getItem,
  updateItem,
  deleteItem,
  toggleStatusItem,
  updateItemSerial,
  updateItemCategory,
  copyItem,
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
const { fetchOrder } = require("@/backend/controllers/OrderController");
const {
  fetchVat,
  createVat,
  updateVat,
  deleteVat,
} = require("@/backend/controllers/VatController");
const {
  createCategoryVal,
  createSubCategoryVal,
} = require("@/backend/validation/category");

router.use(isManager);

router.get("/dashboard", fetchDashboard);

router.get("/item", fetchItem);
router.get("/item/:_id", getItem);
router.post("/item", createItemVal, validation, createItem);
router.patch("/item", createItemVal, validation, updateItem);
router.delete("/item", deleteItem);
router.get("/item/toggle-status/:_id", toggleStatusItem);
router.post("/item/update-serial", updateItemSerial);
router.post("/item/update-category", updateItemCategory);
router.post("/item/copy", copyItem);

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

router.get("/block-user", fetchBlockUser);
router.post("/block-user", createBlockVal, validation, createBlockUser);
router.patch("/block-user", updateBlockVal, validation, updateBlockUser);
router.delete("/block-user", deleteBlockUser);

router.get("/employee", fetchEmployee);
router.post("/employee", createEmployeeVal, validation, createEmployee);
router.patch("/employee", updateEmployeeVal, validation, updateEmployee);
router.delete("/employee", deleteEmployee);

router.get("/vat", fetchVat);
router.post("/vat", vatVal, validation, createVat);
router.patch("/vat", vatVal, validation, updateVat);
router.delete("/vat", deleteVat);

router.get("/order", fetchOrder);
router.post("/update-printing-details", updatePrintingDetails);

router.post(
  "/update-restaurant-name",
  restaurantNameVal,
  validation,
  updateRestaurantName
);

module.exports = router;
