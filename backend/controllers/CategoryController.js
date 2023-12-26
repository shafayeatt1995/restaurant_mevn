const mongoose = require("mongoose");
const { Category, SubCategory } = require("@/backend/models");
const { paginate, randomKey } = require("@/backend/utils");

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

      await Category.create({
        name,
        image,
        restaurantID,
      });
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

      await Category.updateOne({ _id }, { name, image });
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
      const { restaurantID } = req.user;
      const { _id } = req.query;

      await Category.deleteOne({ _id, restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateCategorySerial(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { restaurantID } = req.user;
      const { serialData } = req.body;

      const [itemOne, itemTwo] = serialData;
      if (itemOne && itemTwo) {
        await Category.updateOne(
          { _id: itemOne._id, restaurantID },
          { serial: itemOne.serial },
          { session }
        );
        await Category.updateOne(
          { _id: itemTwo._id, restaurantID },
          { serial: itemTwo.serial },
          { session }
        );
      }
      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      await session.endSession();
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async createSubCategory(req, res) {
    try {
      const { restaurantID } = req.user;
      const { name, categoryID } = req.body;

      await SubCategory.create({
        restaurantID,
        categoryID,
        name,
      });
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
