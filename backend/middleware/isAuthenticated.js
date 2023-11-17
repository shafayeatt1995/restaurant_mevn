const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[0].toLowerCase() === "bearer"
        ? req.headers.authorization.split(" ")[1]
        : null;

    const decoded = await jwt.verify(token, process.env.AUTH_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
