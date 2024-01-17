const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const bearer =
      req.headers.authorization || req.cookies["auth._token.cookie"];
    if (bearer) {
      const token =
        bearer.split(" ")[0].toLowerCase() === "bearer"
          ? bearer.split(" ")[1]
          : null;

      const {
        _id,
        email,
        type,
        isAdmin,
        isManager,
        isWaiter,
        restaurantID,
        restaurantSlug,
      } = await jwt.verify(token, process.env.AUTH_SECRET);
      const payload = { _id, email, type };
      isAdmin ? (payload.isAdmin = true) : "";
      if (isManager) {
        payload.isManager = true;
        payload.restaurantID = restaurantID;
        payload.restaurantSlug = restaurantSlug;
      } else if (isWaiter) {
        payload.isWaiter = true;
        payload.restaurantID = restaurantID;
        payload.restaurantSlug = restaurantSlug;
      }
      req.user = payload;
      next();
    } else {
      throw new Error("Token not found");
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
