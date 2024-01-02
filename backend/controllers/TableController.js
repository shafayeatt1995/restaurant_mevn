const { Table } = require("@/backend/models");
const { paginate } = require("@/backend/utils");
const { stringSlug } = require("@/backend/utils");

const controller = {
  async fetchTable(req, res) {
    try {
      const { page, perPage } = req.query;

      const tables = await Table.aggregate([
        ...paginate(page, perPage),
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json({ tables });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async createTable(req, res) {
    try {
      const { name } = req.body;
      const slug = stringSlug(name);
      const { restaurantID } = req.user;

      await Table.create({ name, slug, restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateTable(req, res) {
    try {
      const { _id, name } = req.body;
      const slug = stringSlug(name);

      await Table.updateOne({ _id }, { name, slug });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async deleteTable(req, res) {
    try {
      const { _id } = req.query;

      await Table.deleteOne({ _id });
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
