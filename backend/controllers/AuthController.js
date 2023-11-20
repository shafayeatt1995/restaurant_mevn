const jwt = require("jsonwebtoken");
const { User } = require("@/backend/models");

const controller = {
  async signup(req, res) {
    try {
      req.body.email = req.body.email.toLowerCase().trim();
      const { email, name, password } = req.body;

      await User.create({ email, name, password });

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async login(req, res) {
    try {
      const { _id, email, power } = req.user;
      const payload = { _id, email };
      power === 420 ? (payload.isAdmin = true) : "";
      const token = jwt.sign(payload, process.env.AUTH_SECRET, {
        expiresIn: "30 days",
      });

      res.status(200).json({ success: true, token });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout successful" });
  },
};

module.exports = controller;
