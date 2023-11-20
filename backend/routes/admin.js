const express = require("express");
const router = express.Router();
const {
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} = require("@/backend/controllers/AdminController");
const { isAdmin } = require("@/backend/middleware");

router.use(isAdmin);

router.get("/user", fetchUser);
router.post("/user", createUser);
router.patch("/user", updateUser);
router.delete("/user", deleteUser);

router.get("/category", fetchCategory);
router.post("/category", createCategory);
router.patch("/category", updateCategory);
router.delete("/category", deleteCategory);

module.exports = router;
