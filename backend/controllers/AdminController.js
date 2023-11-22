const { User, Category, Restaurant } = require("@/backend/models");
const { paginate } = require("@/backend/utils");
const { stringSlug, randomKey } = require("@/backend/utils");
const mongoose = require("mongoose");

const controller = {
  async fetchUser(req, res) {
    try {
      const { page, perPage } = req.query;

      const users = await User.aggregate([
        ...paginate(page, perPage),
        { $project: { password: 0, power: 0 } },
        { $sort: { _id: -1 } },
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
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { name, email, password, restaurantName, type } = req.body;

      const [user] = await User.create([{ email, name, password, type }], {
        session,
      });

      if (type === "owner") {
        const userID = user._id;
        const slug = stringSlug(restaurantName) + randomKey(5);
        await Restaurant.create([{ userID, name: restaurantName, slug }], {
          session,
        });
      }

      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    try {
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async suspendUser(req, res) {
    const mongoose = require("mongoose");
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { _id } = req.body;
      const user = await User.findOne({ _id }).select("+power");

      if (user.type === "admin" && user.power === 420) {
        throw new Error("Cannot suspend admin user");
      } else if (user.type !== "owner") {
        await User.updateOne({ _id }, { suspended: true }, { session });
      } else {
        await User.updateOne({ _id }, { suspended: true }, { session });
        await Restaurant.updateOne(
          { userID: _id },
          { suspended: true },
          { session }
        );
      }

      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  async deleteUser(req, res) {
    const mongoose = require("mongoose");
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { _id } = req.query;
      const user = await User.findOne({ _id }).select("+power");

      if (user.type === "admin" && user.power === 420) {
        throw new Error("Cannot delete admin user");
      } else if (user.type !== "owner") {
        await User.updateOne({ _id }, { deleted: true }, { session });
      } else {
        await User.updateOne({ _id }, { deleted: true }, { session });
        await Restaurant.updateOne(
          { userID: _id },
          { deleted: true },
          { session }
        );
      }

      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  async fetchCategory(req, res) {
    try {
      const { page, perPage } = req.query;

      const categories = await Category.aggregate([
        ...paginate(page, perPage),
        { $sort: { _id: -1 } },
      ]);
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
