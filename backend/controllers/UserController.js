const { User, Restaurant, Order } = require("@/backend/models");
const { paginate, convertDate } = require("@/backend/utils");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const controller = {
  async fetchDashboard(req, res) {
    try {
      const { today, week, month } = req.query;
      const { restaurantID, isWaiter, _id: authID } = req.user;
      const waiterID = {};
      if (isWaiter) {
        waiterID.waiterID = authID;
      }

      const [
        [todaySale],
        [weeklySale],
        [monthlySale],
        // [totalSale],
        todayItems,
        weeklyItems,
        monthlyItems,
      ] = await Promise.all([
        Order.aggregate([
          {
            $match: {
              restaurantID,
              ...waiterID,
              created_at: {
                $gt: convertDate(today, "start"),
                $lt: convertDate(today, "end"),
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
                $gt: convertDate(week[0], "start"),
                $lt: convertDate(week[1], "end"),
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
                $gt: convertDate(month[0], "start"),
                $lt: convertDate(month[1], "end"),
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
        // Order.aggregate([
        //   {
        //     $match: {
        //       restaurantID,
        //       ...waiterID,
        //       status: "complete",
        //     },
        //   },
        //   {
        //     $group: {
        //       _id: null,
        //       totalOrder: { $sum: 1 },
        //       totalSale: { $sum: "$netPrice" },
        //     },
        //   },
        // ]),
        Order.aggregate([
          {
            $match: {
              restaurantID,
              ...waiterID,
              created_at: {
                $gt: convertDate(today, "start"),
                $lt: convertDate(today, "end"),
              },
              status: "complete",
            },
          },
          { $unwind: "$orderItems" },
          {
            $group: {
              _id: "$orderItems._id",
              totalQuantity: { $sum: "$orderItems.qty" },
            },
          },
          { $sort: { totalQuantity: -1 } },
          {
            $lookup: {
              from: "items",
              localField: "_id",
              foreignField: "_id",
              as: "itemDetails",
            },
          },
          { $unwind: "$itemDetails" },
          {
            $project: {
              _id: 1,
              totalQuantity: 1,
              itemName: "$itemDetails.name",
              itemImage: "$itemDetails.image",
            },
          },
          {
            $limit: 10,
          },
        ]),
        Order.aggregate([
          {
            $match: {
              restaurantID,
              ...waiterID,
              created_at: {
                $gt: convertDate(week[0], "start"),
                $lt: convertDate(week[1], "end"),
              },
              status: "complete",
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $group: {
              _id: "$orderItems._id",
              itemName: { $first: "$orderItems.name" },
              totalQuantity: { $sum: "$orderItems.qty" },
            },
          },
          {
            $sort: {
              totalQuantity: -1,
            },
          },
          {
            $lookup: {
              from: "items",
              localField: "_id",
              foreignField: "_id",
              as: "itemDetails",
            },
          },
          { $unwind: "$itemDetails" },
          {
            $project: {
              _id: 1,
              totalQuantity: 1,
              itemName: "$itemDetails.name",
              itemImage: "$itemDetails.image",
            },
          },
          {
            $limit: 10,
          },
        ]),
        Order.aggregate([
          {
            $match: {
              restaurantID,
              ...waiterID,
              created_at: {
                $gt: convertDate(month[0], "start"),
                $lt: convertDate(month[1], "end"),
              },
              status: "complete",
            },
          },
          {
            $unwind: "$orderItems",
          },
          {
            $group: {
              _id: "$orderItems._id",
              itemName: { $first: "$orderItems.name" },
              totalQuantity: { $sum: "$orderItems.qty" },
            },
          },
          {
            $sort: {
              totalQuantity: -1,
            },
          },
          {
            $lookup: {
              from: "items",
              localField: "_id",
              foreignField: "_id",
              as: "itemDetails",
            },
          },
          { $unwind: "$itemDetails" },
          {
            $project: {
              _id: 1,
              totalQuantity: 1,
              itemName: "$itemDetails.name",
              itemImage: "$itemDetails.image",
            },
          },
          {
            $limit: 10,
          },
        ]),
      ]);

      res.status(200).json({
        todaySale,
        weeklySale,
        monthlySale,
        // totalSale,
        todayItems,
        weeklyItems,
        monthlyItems,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
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
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    try {
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
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
        message: "Internal server error",
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
        message: "Internal server error",
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
        message: "Internal server error",
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
        message: "Internal server error",
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
        }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  async fetchPerformance(req, res) {
    try {
      const { restaurantID, _id: userID } = req.user;
      const [startDate, endDate] = req.body.date;

      const performance = await Order.aggregate([
        {
          $match: {
            restaurantID,
            status: "complete",
            created_at: {
              $gt: convertDate(startDate, "start"),
              $lt: convertDate(endDate, "end"),
            },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { waiterIdObj: { $toObjectId: "$waiterID" } },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$waiterIdObj"] } } },
              { $project: { name: 1 } },
            ],
            as: "waiterName",
          },
        },
        {
          $addFields: {
            waiterName: { $arrayElemAt: ["$waiterName.name", 0] },
          },
        },
        {
          $group: {
            _id: "$waiterID",
            name: { $first: "$waiterName" },
            totalPrice: { $sum: "$netPrice" },
            totalOrder: { $sum: "$totalQty" },
          },
        },
      ]);
      res.status(200).json({ success: true, performance });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
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
        message: "Internal server error",
      });
    }
  },
};

module.exports = controller;
