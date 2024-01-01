const mongoose = require("mongoose");
const { Item, Category } = require("@/backend/models");
const { paginate } = require("@/backend/utils");
const { stringSlug, randomKey } = require("@/backend/utils");

const controller = {
  async fetchItem(req, res) {
    try {
      const { page, perPage } = req.query;

      const items = await Item.aggregate([
        ...paginate(page, perPage),
        { $sort: { _id: -1 } },
        {
          $lookup: {
            from: "categories",
            localField: "categoryID",
            foreignField: "_id",
            as: "category",
          },
        },
      ]);
      res.status(200).json({ items });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async getItem(req, res) {
    try {
      const { _id } = req.params;

      const item = await Item.findOne({ _id });
      res.status(200).json({ item });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async createItem(req, res) {
    try {
      const {
        categoryID,
        subCategoryID,
        name,
        image,
        choices,
        addons,
        price,
        discount,
        discountAmount,
        description,
        estimateTime,
      } = req.body;
      const slug = randomKey(10);
      const { restaurantID } = req.user;
      await Item.create({
        restaurantID,
        categoryID,
        subCategoryID,
        name,
        slug,
        image,
        choices,
        addons,
        price,
        discount,
        discountAmount: discount ? discountAmount : 0,
        description,
        estimateTime,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateItem(req, res) {
    try {
      let {
        _id,
        name,
        image,
        choices,
        addons,
        price,
        discount,
        discountAmount,
        description,
        estimateTime,
      } = req.body;
      const slug = randomKey(10);
      const { restaurantID } = req.user;
      await Item.updateOne(
        { _id, restaurantID },
        {
          name,
          slug,
          image,
          choices,
          addons,
          price,
          discount,
          discountAmount: discount ? discountAmount : 0,
          description,
          estimateTime,
        }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async deleteItem(req, res) {
    try {
      const { _id } = req.query;
      const { restaurantID } = req.user;

      await Item.deleteOne({ _id, restaurantID });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async toggleStatusItem(req, res) {
    try {
      const { _id } = req.params;
      const { restaurantID } = req.user;

      await Item.updateOne({ _id, restaurantID }, [
        { $set: { status: { $eq: [false, "$status"] } } },
      ]);
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateItemSerial(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { restaurantID } = req.user;
      const { serialData } = req.body;

      const [itemOne, itemTwo] = serialData;
      if (itemOne && itemTwo) {
        await Item.updateOne(
          { _id: itemOne._id, restaurantID },
          { serial: itemOne.serial },
          { session }
        );
        await Item.updateOne(
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

  async updateItemCategory(req, res) {
    try {
      const { restaurantID } = req.user;
      const { categoryID, subCategoryID, _id } = req.body;

      await Item.updateOne(
        { _id, restaurantID },
        { categoryID, subCategoryID }
      );

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async copyItem(req, res) {
    try {
      const { restaurantID } = req.user;
      const { _id } = req.body;

      const data = await Item.findOne({ _id, restaurantID });
      const {
        categoryID,
        subCategoryID,
        name,
        image,
        choices,
        addons,
        price,
        discount,
        discountAmount,
        description,
        estimateTime,
      } = data;
      const slug = randomKey(10);
      await Item.create({
        restaurantID,
        categoryID,
        subCategoryID,
        name,
        slug,
        image,
        choices,
        addons,
        price,
        discount,
        discountAmount,
        description,
        estimateTime,
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
