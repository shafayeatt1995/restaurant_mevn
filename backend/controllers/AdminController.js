const { Category } = require("@/backend/models");
const paginate = require("@/backend/utils/paginate");

const obj = {
  async fetchCategory(req, res) {
    const { page, perPage } = req.query;
    const categories = await Category.aggregate([...paginate(page, perPage)]);
    res.status(200).json({ categories });
  },

  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout successful" });
  },
};

module.exports = obj;
