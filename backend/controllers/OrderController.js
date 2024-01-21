const {
  Order,
  BlockUser,
  Restaurant,
  PushNotification,
} = require("@/backend/models");
const { paginate } = require("@/backend/utils");
const webPush = require("web-push");
const moment = require("moment");

const sendNotification = async (
  name,
  message = "",
  idList = [],
  emailList = []
) => {
  try {
    if (name === "id") {
      const notification = await PushNotification.find({
        userID: { $in: idList },
      });
      await Promise.all(
        notification.map((data) =>
          webPush.sendNotification(data.subscription, message)
        )
      );
    } else if (name === "email") {
    }
  } catch (err) {
    console.error(err);
  }
};

const calcPrice = (item) => {
  const { qty, price, addon, choice } = item;

  const addonPrice = addon.reduce((total, value) => total + value.price, 0);
  return (price + addonPrice + (choice.price || 0)) * qty;
};

const calcTotalDiscount = (items) => {
  return items.reduce((total, value) => total + value.qty * value.discount, 0);
};

const calcTotalPrice = (items) => {
  return items.reduce((total, value) => total + calcPrice(value), 0);
};

const totalQuantity = (items) => {
  return items.reduce((total, value) => total + value.qty, 0);
};

const controller = {
  async fetchTableOrder(req, res) {
    try {
      const { restaurantID } = req.user;
      const orders = await Order.aggregate([
        {
          $match: {
            restaurantID,
            status: { $in: ["pending", "active"] },
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
      ]);
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async createOrder(req, res) {
    try {
      const {
        userEmail,
        userName,
        restaurantID,
        tableID,
        tableName,
        orderItems,
        note,
        orderType,
      } = req.body;

      const blockUser = await BlockUser.findOne({
        restaurantID,
        email: userEmail,
      });
      if (blockUser && new Date(blockUser.date) > new Date()) {
        res.status(422).json({
          success: false,
          message: `you have been blocked for ${moment(blockUser.date).format(
            "DD-MM-YYYY hh:mmA"
          )}`,
        });
      } else {
        const checkOrder = await Order.findOne({
          restaurantID,
          tableID,
          status: { $in: ["pending", "active"] },
        });
        if (checkOrder) {
          if (checkOrder.userEmail === userEmail) {
            const checkAdditionalOrderNumber = checkOrder.orderItems.reduce(
              (max, current) =>
                current.AdditionalOrderNumber > max
                  ? current.AdditionalOrderNumber
                  : max,
              0
            );
            const newItem = orderItems.map((mapData) => ({
              ...mapData,
              AdditionalOrderNumber: checkAdditionalOrderNumber + 1,
            }));

            const update = await Order.findOneAndUpdate(
              {
                restaurantID,
                tableID,
                userEmail,
              },
              {
                $push: { orderItems: newItem },
                $set: {
                  totalPrice:
                    checkOrder.totalPrice + calcTotalPrice(orderItems),
                  netPrice:
                    checkOrder.netPrice +
                    calcTotalPrice(orderItems) -
                    calcTotalDiscount(orderItems),
                  totalDiscount:
                    checkOrder.totalDiscount + calcTotalDiscount(orderItems),
                  totalQty: checkOrder.totalQty + totalQuantity(orderItems),
                  note,
                  orderType:
                    orderType === checkOrder.orderType
                      ? orderType
                      : `Dine in & Parcel`,
                  status: "pending",
                },
              },
              { new: true, sort: { _id: -1 } }
            );
            const restaurant = await Restaurant.findOne({ _id: restaurantID });
            if (restaurant) {
              const { userID } = restaurant;
              sendNotification(`id`, `${tableName} order is updated`, [
                userID,
                update.waiterID ?? "",
              ]);
            }
            global.io.emit(`order-notification-${restaurantID}`);
            res.status(200).json({ success: true });
          } else {
            res.status(422).json({
              success: false,
              message: `Sorry, Someone has already ordered from this table. Please ask a waiter for help`,
            });
          }
        } else {
          await Order.create({
            userEmail,
            userName,
            restaurantID,
            tableID,
            tableName,
            orderItems,
            totalPrice: calcTotalPrice(orderItems),
            netPrice:
              calcTotalPrice(orderItems) - calcTotalDiscount(orderItems),
            totalDiscount: calcTotalDiscount(orderItems),
            totalQty: totalQuantity(orderItems),
            note,
            orderType,
          });
          const restaurant = await Restaurant.findOne({ _id: restaurantID });
          if (restaurant) {
            const { userID, waiter } = restaurant;
            sendNotification(`id`, `Receive new order from ${tableName}`, [
              userID,
              ...waiter,
            ]);
          }
          global.io.emit(`order-notification-${restaurantID}`);
          res.status(200).json({ success: true });
        }
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async fetchOrder(req, res) {
    try {
      const { page, perPage, status, date, orderType } = req.query;
      const { restaurantID, isWaiter, _id } = req.user;
      const matchQuery = { restaurantID };
      if (status) {
        matchQuery.status = status;
      }
      if (orderType !== "All") {
        matchQuery.orderType = orderType;
      }
      if (date && date[0] != "null" && date[1] != "null") {
        let startDate = new Date(date[0]);
        startDate.setHours(0, 0, 0, 0);

        let endDate = new Date(date[1]);
        endDate.setHours(23, 59, 59, 999);

        matchQuery.created_at = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
      if (isWaiter && status !== "pending") {
        if (!status) {
          matchQuery.status = "pending";
        } else {
          matchQuery.waiterID = _id;
        }
      } else {
      }

      const orders = await Order.aggregate([
        { $match: matchQuery },
        ...paginate(page, perPage),
        { $sort: { _id: -1 } },
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
      ]);
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const { _id, status, currentStatus } = req.query;
      const { _id: waiterID, name: waiterName, restaurantID } = req.user;
      const updateData = { status };
      if (currentStatus === "pending") {
        const checkExist = await Order.findOne({
          _id,
          restaurantID,
          waiterID: { $exists: true },
        });
        if (!checkExist) {
          updateData.waiterID = waiterID;
          updateData.waiterName = waiterName;
        }
      }
      await Order.updateOne(
        {
          _id,
          restaurantID,
        },
        updateData
      );
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
