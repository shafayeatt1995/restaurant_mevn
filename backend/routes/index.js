const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("@/backend/middleware");
const axios = require("axios");

router.post("/proxy", async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    return res.send(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something wrong. Please try again" });
  }
});
router.use("/auth", require("./auth"));
router.use("/menu", require("./menu"));
router.use("/contact", require("./contact"));
router.use("/order", require("./order"));

router.use(isAuthenticated);
router.use("/push-notification", require("./push-notification"));
router.use("/admin", require("./admin"));
router.use("/manager", require("./manager"));
router.use("/user", require("./user"));
router.use("/item", require("./item"));
router.use("/mow", require("./mow"));

module.exports = router;
