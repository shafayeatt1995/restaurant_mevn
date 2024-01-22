const { Tax } = require("@/backend/models");
const { paginate } = require("@/backend/utils");

const controller = {
  async allTax(req, res) {
    try {
      const { restaurantID } = req.user;

      const taxes = await Tax.find({ restaurantID });
      res.status(200).json({ taxes });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async fetchTax(req, res) {
    try {
      const { page, perPage } = req.query;
      const { restaurantID } = req.user;

      const taxes = await Tax.aggregate([
        { $match: { restaurantID } },
        ...paginate(page, perPage),
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json({ taxes });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async createTax(req, res) {
    try {
      const { name, percent } = req.body;
      const { restaurantID } = req.user;

      await Tax.create({ name, percent, restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateTax(req, res) {
    try {
      const { _id, name, percent } = req.body;
      const { restaurantID } = req.user;

      await Tax.updateOne({ _id, restaurantID }, { name, percent });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async deleteTax(req, res) {
    try {
      const { _id } = req.query;
      const { restaurantID } = req.user;

      await Tax.deleteOne({ _id, restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = controller;
