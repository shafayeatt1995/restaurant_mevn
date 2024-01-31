const { BlockUser } = require("@/backend/models");
const { paginate } = require("@/backend/utils");

const controller = {
  async fetchBlockUser(req, res) {
    try {
      const { page, perPage } = req.query;
      const { restaurantID } = req.user;

      const users = await BlockUser.aggregate([
        { $match: { restaurantID } },
        ...paginate(page, perPage),
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async createBlockUser(req, res) {
    try {
      const { email, date } = req.body;
      const { restaurantID } = req.user;

      await BlockUser.create({ email, date: new Date(date), restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async updateBlockUser(req, res) {
    try {
      const { _id, email, date } = req.body;

      await BlockUser.updateOne({ _id }, { email, date: new Date(date) });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async deleteBlockUser(req, res) {
    try {
      const { _id } = req.query;

      await BlockUser.deleteOne({ _id });
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
