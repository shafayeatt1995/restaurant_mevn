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

      const { _id, email } = await jwt.verify(token, process.env.AUTH_SECRET);
      // req.auth = {};
      req.user = { _id, email };
      next();
    } else {
      throw new Error("Email already is use!");
    }
  } catch (err) {
    console.log("ami error", err);
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
