const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("@/backend/middleware");

router.use("/auth", require("./auth"));
router.use("/menu", require("./menu"));

router.use(isAuthenticated);
router.use("/push-notification", require("./push-notification"));
router.use("/order", require("./order"));
router.use("/admin", require("./admin"));
router.use("/manager", require("./manager"));
router.use("/user", require("./user"));
router.use("/item", require("./item"));
router.use("/mow", require("./mow"));

const selectedPrinter = "DIR-E58";
router.get("/print", async (req, res) => {
  try {
    const print = `<p>Amar nam shafayet Al-ANik</p>`;
    res.status(200).json({ success: true, print });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
