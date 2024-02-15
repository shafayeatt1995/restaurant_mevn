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
  updatePrintingDetails,
  fetchPerformance,
  toggleProtection,
  fetchAllEmployee,
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
  createFeatureCategory,
  updateFeatureCategory,
} = require("@/backend/controllers/CategoryController");
const {
  fetchOrder,
  fetchPrintOrder,
  addServiceCharge,
  fetchSingleOrder,
  fetchBestItems,
  chartSalesReport,
  chartOrderReport,
} = require("@/backend/controllers/OrderController");
const {
  fetchVat,
  createVat,
  updateVat,
  deleteVat,
} = require("@/backend/controllers/VatController");
const {
  fetchNotification,
  toggleNotification,
  markAllNotification,
  fetchNewNotification,
} = require("@/backend/controllers/NotificationController");
const {
  createCategoryVal,
  createSubCategoryVal,
  createFeatureCategoryVal,
} = require("@/backend/validation/category");

router.use(isManager);

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
  "/feature-category",
  createFeatureCategoryVal,
  validation,
  createFeatureCategory
);
router.patch(
  "/feature-category",
  createFeatureCategoryVal,
  validation,
  updateFeatureCategory
);

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
router.get("/employee-all", fetchAllEmployee);
router.post("/employee", createEmployeeVal, validation, createEmployee);
router.patch("/employee", updateEmployeeVal, validation, updateEmployee);
router.delete("/employee", deleteEmployee);

router.get("/vat", fetchVat);
router.post("/vat", vatVal, validation, createVat);
router.patch("/vat", vatVal, validation, updateVat);
router.delete("/vat", deleteVat);

router.get("/notification", fetchNotification);
router.get("/notification/new", fetchNewNotification);
router.get("/notification/toggle", toggleNotification);
router.get("/notification/mark", markAllNotification);

router.get("/single-order/:_id", fetchSingleOrder);
router.get("/order", fetchOrder);
router.get("/order/print-details/:_id", fetchPrintOrder);
router.post("/add-service-charge", addServiceCharge);
router.post("/update-printing-details", updatePrintingDetails);

router.post("/performance", fetchPerformance);
router.get("/toggle-protection", toggleProtection);

router.post("/best-items", fetchBestItems);
router.post("/chart-sales-report", chartSalesReport);
router.post("/chart-order-report", chartOrderReport);

router.post(
  "/update-restaurant-name",
  restaurantNameVal,
  validation,
  updateRestaurantName
);

module.exports = router;
