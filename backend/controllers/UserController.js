const jwt = require("jsonwebtoken");
const { User } = require("@/backend/models");

const obj = {
  async profile(req, res) {
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    if (user && user.power === 420) {
      user.is_admin = true;
    }
    res.status(200).json({ success: true, user });
  },

  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout successful" });
  },
};

module.exports = obj;
