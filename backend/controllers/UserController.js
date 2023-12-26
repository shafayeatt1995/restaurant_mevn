const { User, Restaurant } = require("@/backend/models");
const { paginate } = require("@/backend/utils");
const { stringSlug, randomKey } = require("@/backend/utils");
const mongoose = require("mongoose");

const controller = {
  async profile(req, res) {
    const { _id } = req.user;
    const user = await User.findOne({ _id }).select("+power");
    if (user && user.power === 420 && user.type === "admin") {
      is_admin = true;
      delete user._doc.power;
      return res
        .status(200)
        .json({ success: true, user: { ...user._doc, is_admin: true } });
    } else if (user && user.type === "manager") {
      const restaurant = await Restaurant.findOne({ userID: user._id });
      user._doc.restaurant = restaurant;
      return res.status(200).json({ success: true, user });
    }
    res.status(200).json({ success: true, user });
  },

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

      if (type === "manager") {
        const userID = user._id;
        const slug = randomKey(6);
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
      await session.endSession();
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
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { _id } = req.body;
      const user = await User.findOne({ _id }).select("+power");

      if (user.type === "admin" && user.power === 420) {
        throw new Error("Cannot suspend admin user");
      } else if (user.type !== "manager") {
        await User.updateOne(
          { _id },
          [{ $set: { suspended: { $eq: [false, "$suspended"] } } }],
          { session }
        );
      } else {
        await User.updateOne(
          { _id },
          [{ $set: { suspended: { $eq: [false, "$suspended"] } } }],
          { session }
        );
        await Restaurant.updateOne(
          { userID: _id },
          [{ $set: { suspended: { $eq: [false, "$suspended"] } } }],
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
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  async deleteUser(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { _id } = req.query;
      const user = await User.findOne({ _id }).select("+power");

      if (user.type === "admin" && user.power === 420) {
        throw new Error("Cannot delete admin user");
      } else if (user.type !== "manager") {
        await User.updateOne(
          { _id },
          [{ $set: { deleted: { $eq: [false, "$deleted"] } } }],
          { session }
        );
      } else {
        await User.updateOne(
          { _id },
          [{ $set: { deleted: { $eq: [false, "$deleted"] } } }],
          { session }
        );
        await Restaurant.updateOne(
          { userID: _id },
          [{ $set: { deleted: { $eq: [false, "$deleted"] } } }],
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
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  async updateRestaurantName(req, res) {
    try {
      const { restaurantID, userID, name, logo } = req.body;
      await Restaurant.updateOne({ _id: restaurantID, userID }, { name, logo });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

module.exports = controller;
