const { Table } = require("@/backend/models");
const { paginate } = require("@/backend/utils");

const controller = {
  async fetchAllTable(req, res) {
    try {
      const { restaurantID } = req.user;

      const tables = await Table.aggregate([
        { $match: { restaurantID } },
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json({ tables });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async fetchTable(req, res) {
    try {
      const { page, perPage } = req.query;
      const { restaurantID } = req.user;

      const tables = await Table.aggregate([
        { $match: { restaurantID } },
        ...paginate(page, perPage),
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json({ tables });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async createTable(req, res) {
    try {
      const { name } = req.body;
      const { restaurantID } = req.user;

      await Table.create({ name, restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async updateTable(req, res) {
    try {
      const { _id, name } = req.body;

      await Table.updateOne({ _id }, { name });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async deleteTable(req, res) {
    try {
      const { _id } = req.query;

      await Table.deleteOne({ _id });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },
};

module.exports = controller;
