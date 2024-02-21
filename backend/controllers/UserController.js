const mongoose = require("mongoose");
const { User, Restaurant, Order } = require("@/backend/models");
const { paginate, stringSlug } = require("@/backend/utils");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const controller = {
  async fetchDashboard(req, res) {
    try {
      const { today, month } = req.query;
      const { restaurantID, isWaiter, _id: authID } = req.user;
      const waiterID = {};
      if (isWaiter) {
        waiterID.waiterID = authID;
      }

      const [[todaySale], [monthlySale], [dailyCancel], [monthlyCancel]] =
        await Promise.all([
          Order.aggregate([
            {
              $match: {
                restaurantID,
                ...waiterID,
                created_at: {
                  $gt: today[0],
                  $lt: today[1],
                },
                status: "complete",
              },
            },
            {
              $group: {
                _id: null,
                totalOrder: { $sum: 1 },
                totalSale: { $sum: "$netPrice" },
              },
            },
          ]),
          Order.aggregate([
            {
              $match: {
                restaurantID,
                ...waiterID,
                created_at: {
                  $gt: month[0],
                  $lt: month[1],
                },
                status: "complete",
              },
            },
            {
              $group: {
                _id: null,
                totalOrder: { $sum: 1 },
                totalSale: { $sum: "$netPrice" },
              },
            },
          ]),
          Order.aggregate([
            {
              $match: {
                restaurantID,
                ...waiterID,
                created_at: {
                  $gt: today[0],
                  $lt: today[1],
                },
                status: "complete",
              },
            },
            { $count: "dailyCancel" },
          ]),
          Order.aggregate([
            {
              $match: {
                restaurantID,
                ...waiterID,
                created_at: {
                  $gt: month[0],
                  $lt: month[1],
                },
                status: "complete",
              },
            },
            { $count: "monthlyCancel" },
          ]),
        ]);
      res.status(200).json({
        todaySale,
        monthlySale,
        dailyCancel: dailyCancel?.dailyCancel ?? 0,
        monthlyCancel: monthlyCancel?.monthlyCancel ?? 0,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

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
    } else if (user && user.type === "waiter") {
      const restaurant = await Restaurant.findOne({ waiter: user._id });
      if (restaurant) {
        const { _id, logo, name, slug } = restaurant;
        user._doc.restaurant = { _id, logo, name, slug };
        return res.status(200).json({ success: true, user });
      }
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
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
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
        await Restaurant.create([{ userID, name: restaurantName }], {
          session,
        });
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

  async updateUser(req, res) {
    try {
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
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
      console.error(error);
      await session.abortTransaction();
      await session.endSession();
      res.status(500).json({
        success: false,
        message: error.message || "Something wrong. Please try again",
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
      console.error(error);
      await session.abortTransaction();
      await session.endSession();
      res.status(500).json({
        success: false,
        message: error.message || "Something wrong. Please try again",
      });
    }
  },

  async updateRestaurantName(req, res) {
    try {
      const { restaurantID, userID, name, logo } = req.body;
      await Restaurant.updateOne({ _id: restaurantID, userID }, { name, logo });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async fetchEmployee(req, res) {
    try {
      const { restaurantID, _id } = req.user;
      const restaurant = await Restaurant.findOne({
        _id: restaurantID,
        userID: _id,
      });
      const { waiter } = restaurant;
      const employees = await User.find({ _id: { $in: waiter } });
      res.status(200).json({ success: true, employees });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async fetchAllEmployee(req, res) {
    try {
      const { restaurantID, _id } = req.user;
      const restaurant = await Restaurant.findOne({
        _id: restaurantID,
        userID: _id,
      });
      const { waiter } = restaurant;
      const employees = await User.find({ _id: { $in: waiter } });
      res.status(200).json({ success: true, employees });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async createEmployee(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { restaurantID, _id } = req.user;
      const { email, name, password } = req.body;

      const [user] = await User.create(
        [{ email, name, password, type: "waiter" }],
        { session }
      );
      if (!user._id) {
        throw new Error("Don't use space in ID");
      }
      await Restaurant.updateOne(
        { _id: restaurantID, userID: _id },
        { $push: { waiter: user._id } },
        { session }
      );

      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      await session.endSession();
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async updateEmployee(req, res) {
    try {
      const { restaurantID, _id: userID } = req.user;
      const { email, name, password, _id } = req.body;
      const data = { email, name };
      if (password) {
        data.password = bcrypt.hashSync(password, 10);
      }

      const restaurant = await Restaurant.findOne({
        _id: restaurantID,
        userID,
      });

      if (restaurant.waiter.includes(_id)) {
        await User.updateOne({ _id }, data);
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async deleteEmployee(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { restaurantID, _id: userID } = req.user;
      const { _id } = req.query;

      const restaurant = await Restaurant.findOne({
        _id: restaurantID,
        userID,
      });

      if (restaurant.waiter.includes(_id)) {
        await Restaurant.updateOne(
          { _id: restaurantID, userID },
          { $pull: { waiter: _id } },
          { session }
        );
        await User.deleteOne({ _id }, { session });
      }
      await session.commitTransaction();
      await session.endSession();
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      await session.endSession();
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async updatePrintingDetails(req, res) {
    try {
      const { restaurantID, _id: userID } = req.user;
      const {
        printName,
        printAddress,
        printPhone,
        customMessage,
        printImage,
        printEmail,
        printWebsite,
        bin,
        mushak,
      } = req.body;

      await Restaurant.updateOne(
        { _id: restaurantID, userID },
        {
          printName,
          printAddress,
          printPhone,
          customMessage,
          printImage,
          printEmail,
          printWebsite,
          bin,
          mushak,
        }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async fetchWaiterSales(req, res) {
    try {
      const { restaurantID } = req.user;
      const {
        date: [start, end],
      } = req.body;
      const performance = await Order.aggregate([
        {
          $match: {
            restaurantID,
            status: "complete",
            waiterID: {
              $type: "string",
              $exists: true,
              $ne: null,
            },
            created_at: {
              $gt: new Date(start),
              $lt: new Date(end),
            },
          },
        },
        {
          $group: {
            _id: "$waiterID",
            waiterName: { $last: "$waiterName" },
            totalRevenue: { $sum: "$netPrice" },
          },
        },
        {
          $project: {
            _id: 1,
            waiterName: 1,
            totalRevenue: 1,
          },
        },
        { $sort: { waiterName: 1 } },
      ]);

      res.status(200).json({ success: true, performance });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async fetchWaiterOrders(req, res) {
    try {
      const { restaurantID } = req.user;
      const {
        date: [start, end],
      } = req.body;
      const performance = await Order.aggregate([
        {
          $match: {
            restaurantID,
            status: "complete",
            waiterID: {
              $type: "string",
              $exists: true,
              $ne: null,
            },
            created_at: {
              $gt: new Date(start),
              $lt: new Date(end),
            },
          },
        },
        {
          $group: {
            _id: "$waiterID",
            waiterName: { $last: "$waiterName" },
            totalOrder: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 1,
            waiterName: 1,
            totalOrder: 1,
          },
        },
        { $sort: { waiterName: 1 } },
      ]);

      res.status(200).json({ success: true, performance });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async toggleProtection(req, res) {
    try {
      const { restaurantID: _id, _id: userID } = req.user;
      await Restaurant.updateOne({ _id, userID }, [
        { $set: { authOrder: { $eq: [false, "$authOrder"] } } },
      ]);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async updateProfile(req, res) {
    try {
      const { _id } = req.user;
      const { name } = req.query;
      await User.updateOne({ _id }, { name });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async updatePassword(req, res) {
    try {
      const { _id } = req.user;
      const { new: password } = req.query;
      const hashPassword = await bcrypt.hashSync(password, 10);
      await User.updateOne({ _id }, { password: hashPassword });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },

  async createRestaurant(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { _id, email } = req.user;
      const { name } = req.body;
      const restaurant = await Restaurant.findOne({ userID: _id });
      if (!restaurant) {
        await User.updateOne(
          { _id, email },
          { $set: { type: "manager" } },
          { session }
        );
        await Restaurant.create(
          [
            {
              userID: _id,
              name,
              slug: stringSlug(name),
            },
          ],
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
      res.status(500).json({
        success: false,
        message: "Something wrong. Please try again",
      });
    }
  },
};

module.exports = controller;
