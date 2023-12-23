const { Category } = require("@/backend/models");
const { paginate, randomKey } = require("@/backend/utils");
const { stringSlug } = require("@/backend/utils");

const controller = {
  async fetchCategory(req, res) {
    try {
      const { restaurantID } = req.user;
      const categories = await Category.find({ restaurantID });
      res.status(200).json({ categories });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async createCategory(req, res) {
    try {
      const { restaurantID } = req.user;
      const { name, image } = req.body;
      const slug = stringSlug(name) + randomKey(1);

      await Category.create({ name, slug, image, restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateCategory(req, res) {
    try {
      const { _id, image, name } = req.body;
      const slug = stringSlug(name) + randomKey(1);

      await Category.updateOne({ _id }, { name, slug, image });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async deleteCategory(req, res) {
    try {
      const { _id } = req.query;

      await Category.deleteOne({ _id });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = controller;
