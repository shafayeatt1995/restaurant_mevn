const { Category } = require("@/backend/models");
const paginate = require("@/backend/utils/paginate");
const { stringSlug } = require("@/backend/utils");

const controller = {
  async fetchCategory(req, res) {
    const { page, perPage } = req.query;

    const categories = await Category.aggregate([...paginate(page, perPage)]);
    res.status(200).json({ categories });
  },
  async createCategory(req, res) {
    const { name, image } = req.body;
    const slug = stringSlug(name);

    await Category.create({ name, slug, image });
    res.status(200).json({ success: true });
  },
  async updateCategory(req, res) {
    const { _id, image, name } = req.body;
    const slug = stringSlug(name);

    await Category.updateOne({ _id }, { name, slug, image });
    res.status(200).json({ success: true });
  },
  async deleteCategory(req, res) {
    const { _id } = req.query;

    await Category.deleteOne({ _id });
    res.status(200).json({ success: true });
  },

  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout successful" });
  },
};

module.exports = controller;
