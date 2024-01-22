const express = require("express");
const router = express.Router();

const {
  fetchOrder,
  updateOrderStatus,
  fetchTableOrder,
} = require("@/backend/controllers/OrderController");
const { fetchAllTable } = require("@/backend/controllers/TableController");
const { allVat } = require("@/backend/controllers/VatController");

router.get("/vat", allVat);
router.get("/order", fetchOrder);
router.get("/table", fetchAllTable);
router.get("/order-table", fetchTableOrder);
router.get("/order/update-status", updateOrderStatus);

module.exports = router;
