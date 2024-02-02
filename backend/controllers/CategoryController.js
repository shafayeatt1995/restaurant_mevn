const mongoose = require("mongoose");
const {
  Category,
  SubCategory,
  Item,
  FeatureCategory,
} = require("@/backend/models");
const { paginate, randomKey } = require("@/backend/utils");

const controller = {
  async fetchCategory(req, res) {
    try {
      const { restaurantID } = req.user;
      const categories = await Category.find({ restaurantID });
      res.status(200).json({ categories });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
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
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async updateCategory(req, res) {
    try {
      const { _id, image, name } = req.body;
      const { restaurantID } = req.user;

      await Category.updateOne({ _id, restaurantID }, { name, image });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async deleteCategory(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { restaurantID } = req.user;
      const { _id } = req.query;

      await Category.deleteOne({ _id, restaurantID }, { session });
      await SubCategory.deleteMany(
        { categoryID: _id, restaurantID },
        { session }
      );
      await Item.deleteMany({ categoryID: _id, restaurantID }, { session });

      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
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
      console.error(error);
      await session.abortTransaction();
      await session.endSession();
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
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
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async updateSubCategory(req, res) {
    try {
      const { name, _id } = req.body;
      const { restaurantID } = req.user;

      await SubCategory.updateOne({ _id, restaurantID }, { name });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async deleteSubCategory(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { restaurantID } = req.user;
      const { _id } = req.query;

      await SubCategory.deleteOne({ _id, restaurantID }, { session });
      await Item.deleteMany({ subCategoryID: _id, restaurantID }, { session });

      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      await session.endSession();
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async updateSubCategorySerial(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { restaurantID } = req.user;
      const { serialData } = req.body;

      const [itemOne, itemTwo] = serialData;
      if (itemOne && itemTwo) {
        await SubCategory.updateOne(
          { _id: itemOne._id, restaurantID },
          { serial: itemOne.serial },
          { session }
        );
        await SubCategory.updateOne(
          { _id: itemTwo._id, restaurantID },
          { serial: itemTwo.serial },
          { session }
        );
      }
      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      await session.endSession();
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async createFeatureCategory(req, res) {
    try {
      const { restaurantID } = req.user;
      const { name, image, items } = req.body;

      await FeatureCategory.create({
        name,
        image,
        restaurantID,
        items,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async updateFeatureCategory(req, res) {
    try {
      const { _id, image, name, items } = req.body;
      const { restaurantID } = req.user;

      await FeatureCategory.updateOne(
        { _id, restaurantID },
        { name, image, items }
      );
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
