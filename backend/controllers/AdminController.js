const { User, Category } = require("@/backend/models");
const { paginate } = require("@/backend/utils");
const { stringSlug } = require("@/backend/utils");

const controller = {
  async fetchUser(req, res) {
    try {
      const { page, perPage } = req.query;

      const users = await User.aggregate([
        ...paginate(page, perPage),
        { $project: { password: 0, power: 0 } },
      ]);
      res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async createUser(req, res) {
    try {
      console.log(req.body);
      // const { name, image } = req.body;
      // const slug = stringSlug(name);

      // await Category.create({ name, slug, image });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    try {
      const { _id, image, name } = req.body;
      const slug = stringSlug(name);

      await Category.updateOne({ _id }, { name, slug, image });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async deleteUser(req, res) {
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

  async fetchCategory(req, res) {
    try {
      const { page, perPage } = req.query;

      const categories = await Category.aggregate([...paginate(page, perPage)]);
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
      const { name, image } = req.body;
      const slug = stringSlug(name);

      await Category.create({ name, slug, image });
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
      const slug = stringSlug(name);

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

  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout successful" });
  },
};

module.exports = controller;
