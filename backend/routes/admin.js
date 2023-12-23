const express = require("express");
const router = express.Router();
const { isAdmin } = require("@/backend/middleware");
const {
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
  suspendUser,
} = require("@/backend/controllers/UserController");

const { validation } = require("@/backend/validation");
const { createUserVal } = require("@/backend/validation/user");

router.use(isAdmin);

router.get("/user", fetchUser);
router.post("/user", createUserVal, validation, createUser);
router.patch("/user", updateUser);
router.put("/user", suspendUser);
router.delete("/user", deleteUser);

module.exports = router;
