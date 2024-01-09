const jwt = require("jsonwebtoken");
const { User, Restaurant } = require("@/backend/models");
const { randomKey } = require("../utils");

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
      } else if (type === "waiter") {
        const waiterRestaurant = await Restaurant.findOne({ waiter: _id });
        if (waiterRestaurant) {
          payload.restaurantID = waiterRestaurant._id;
          payload.restaurantSlug = waiterRestaurant.slug;
          payload.isWaiter = true;
        }
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

  async socialLogin(req, res) {
    try {
      delete req.user;
      const { provider, id, displayName, email, picture } = req.passportUser;
      const user = await User.findOne({ email });
      if (user) {
        if (user.provider === provider && user.socialAccount) {
          const credential = { email, id, provider, key: randomKey(20) };
          res.redirect(`/social-login?c=${btoa(JSON.stringify(credential))}`);
        } else {
          const data = { error: true };
          res.redirect(`/social-login?e=${btoa(JSON.stringify(data))}`);
        }
      } else {
        await User.create({
          name: displayName,
          email,
          password: `${id}+${process.env.SOCIAL_LOGIN_PASS}`,
          avatar: picture,
          socialAccount: true,
          provider,
        });
        const credential = { email, id, provider, key: randomKey(20) };
        res.redirect(`/social-login?c=${btoa(JSON.stringify(credential))}`);
      }
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
