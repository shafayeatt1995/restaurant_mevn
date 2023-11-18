const express = require("express");
const router = express.Router();
const { fetchImage } = require("@/backend/controllers/ImageController");

router.get("/", fetchImage);
// router.post("/", fetchImage);
// router.delete("/", fetchImage);

module.exports = router;
