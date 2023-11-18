const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("@/backend/middleware");
// const { CommonController } = require("@backend/controllers");

router.use("/auth", require("./auth"));

router.use(isAuthenticated);
router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
// router.use(isGuestOrAuth);

// router.use("/short", require("./short"));

// router.get("/wp/streaks", CommonController.getStreakForWp);
// router.use("/affiliates", require("./affiliates"));
// router.use("/auth", require("./auth"));
// router.get("/outcomes", CommonController.getOutcomes);

// router.use("/amigo-copier", require("./amigo-copier"));

// router.get("/page-videos/help", CommonController.getHelpPageVideos);
// router.get("/page-videos/:location", CommonController.getPageVideo);

// router.use("/fixtures", require("./fixtures"));
// router.use("/players", require("./players"));

// router.use("/user", require("./user"));
// router.use("/value-bets", require("./value-bets"));

// router.use("/strategies", require("./strategies"));
// router.use("/referees", require("./referees"));

// router.use(isAuthenticated);

// router.use("/admin", isAdmin, require("./admin"));
// router.use("/amigo-seller", require("./amigo-seller"));
// router.use("/time-travel", isAdmin, require("./time-travel"));

// router.use("/user/dashboard", require("./dashboard"));
// router.use("/picks", require("./picks"));
// router.use("/preset-rules", require("./preset-rules"));

// router.use("/quick-alerts", require("./quick-alerts"));
// router.use("/teams", require("./teams"));
// router.use("/foul-settings", require("./foul-settings"));
// router.use("/player-lineups", require("./player-lineups"));
// router.use("/foul-alerts", require("./foul-alerts"));

module.exports = router;
