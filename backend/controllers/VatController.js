const { Vat } = require("@/backend/models");
const { paginate } = require("@/backend/utils");

const controller = {
  async allVat(req, res) {
    try {
      const { restaurantID } = req.user;

      const vats = await Vat.find({ restaurantID });
      res.status(200).json({ vats });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async fetchVat(req, res) {
    try {
      const { page, perPage } = req.query;
      const { restaurantID } = req.user;

      const vats = await Vat.aggregate([
        { $match: { restaurantID } },
        ...paginate(page, perPage),
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json({ vats });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async createVat(req, res) {
    try {
      const { name, percent } = req.body;
      const { restaurantID } = req.user;

      await Vat.create({ name, percent, restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async updateVat(req, res) {
    try {
      const { _id, name, percent } = req.body;
      const { restaurantID } = req.user;

      await Vat.updateOne({ _id, restaurantID }, { name, percent });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async deleteVat(req, res) {
    try {
      const { _id } = req.query;
      const { restaurantID } = req.user;

      await Vat.deleteOne({ _id, restaurantID });
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
