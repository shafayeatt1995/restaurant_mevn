const jwt = require("jsonwebtoken");
const { User, Restaurant } = require("@/backend/models");

const controller = {
  async signup(req, res) {
    try {
      req.body.email = req.body.email.toLowerCase().trim();
      const { email, name, password } = req.body;

      await User.create({ email, name, password });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async login(req, res) {
    try {
      const { _id, email, power, type } = req.user;
      const payload = { _id, email, type };
      const restaurant = await Restaurant.findOne({ userID: _id });

      if (power === 420 && type === "admin") {
        payload.isAdmin = true;
      } else if (type === "manager" && restaurant) {
        payload.restaurantID = restaurant._id;
        payload.restaurantSlug = restaurant.slug;
        payload.isManager = true;
      }

      const token = jwt.sign(payload, process.env.AUTH_SECRET, {
        expiresIn: "30 days",
      });

      res.status(200).json({ success: true, token });
    } catch (error) {
      console.error(error);
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
