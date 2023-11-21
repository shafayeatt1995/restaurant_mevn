const { User } = require("@/backend/models");

const controller = {
  async profile(req, res) {
    const { _id } = req.user;
    const user = await User.findOne({ _id }).select("+power");
    if (user && user.power === 420 && user.type === "admin") {
      is_admin = true;
      delete user._doc.power;
      return res
        .status(200)
        .json({ success: true, user: { ...user._doc, is_admin: true } });
    }
    res.status(200).json({ success: true, user });
  },

  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout successful" });
  },
};

module.exports = controller;
