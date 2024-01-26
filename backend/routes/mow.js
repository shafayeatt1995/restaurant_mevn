const express = require("express");
const router = express.Router();

const {
  fetchOrder,
  updateOrderStatus,
  fetchTableOrder,
  printOrderDetails,
} = require("@/backend/controllers/OrderController");
const { fetchAllTable } = require("@/backend/controllers/TableController");
const { allVat } = require("@/backend/controllers/VatController");
const { fetchDashboard } = require("@/backend/controllers/UserController");

router.get("/dashboard", fetchDashboard);
router.get("/vat", allVat);
router.get("/order", fetchOrder);
router.get("/table", fetchAllTable);
router.get("/order-table", fetchTableOrder);
router.get("/order/update-status", updateOrderStatus);
router.get("/print-order-details", printOrderDetails);

module.exports = router;
