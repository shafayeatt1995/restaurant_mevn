const { User, Category } = require("@/backend/models");

const obj = {
  async fetchCategory(req, res) {
    console.log(req.query);
    res.status(200).json({ success: true });
  },

  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout successful" });
  },
};

module.exports = obj;
