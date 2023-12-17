const express = require("express");
const router = express.Router();
const { isOwner } = require("@/backend/middleware");
const { createItemVal } = require("@/backend/validation/item");
const { validation } = require("@/backend/validation");
const { fetchCategory } = require("@/backend/controllers/CategoryController");
const {
  createItem,
  fetchItem,
  getItem,
  updateItem,
} = require("@/backend/controllers/ItemController");

router.use(isOwner);
router.get("/category", fetchCategory);
router.get("/item", fetchItem);
router.get("/item/:_id", getItem);
router.post("/item", createItemVal, validation, createItem);
router.patch("/item", createItemVal, validation, updateItem);

module.exports = router;
