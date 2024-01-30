const {
  Order,
  BlockUser,
  Restaurant,
  PushNotification,
  Table,
  Notification,
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
      const data = await Promise.all(
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

const calcSubTotalPrice = (items) => {
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
                  subTotalPrice:
                    checkOrder.subTotalPrice + calcSubTotalPrice(orderItems),
                  totalPrice:
                    checkOrder.totalPrice +
                    calcSubTotalPrice(orderItems) -
                    calcTotalDiscount(orderItems),
                  netPrice:
                    checkOrder.totalPrice +
                    calcSubTotalPrice(orderItems) -
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
            subTotalPrice: calcSubTotalPrice(orderItems),
            totalPrice:
              calcSubTotalPrice(orderItems) - calcTotalDiscount(orderItems),
            netPrice:
              calcSubTotalPrice(orderItems) - calcTotalDiscount(orderItems),
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
      const {
        _id: waiterID,
        name: waiterName,
        restaurantID,
        isManager,
      } = req.user;
      const updateData = { status };
      const checkExist = await Order.findOne({
        _id,
        restaurantID,
        waiterID: { $exists: true },
      });
      if (currentStatus === "pending") {
        if (checkExist) {
          if (waiterID !== checkExist.waiterID && !isManager) {
            return res.status(422).json({
              success: false,
              message: "Someone already receive this order",
            });
          }
        } else {
          updateData.waiterID = waiterID;
          updateData.waiterName = waiterName;
        }
      }
      if (status === "cancel" && checkExist) {
        if (waiterID !== checkExist.waiterID && !isManager) {
          return res.status(422).json({
            success: false,
            message: "You can't cancel this order",
          });
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

  async addServiceCharge(req, res) {
    try {
      const { _id, vat, additionalCharges: additional } = req.body;
      const { restaurantID } = req.user;
      const { totalPrice } = await Order.findOne({ _id, restaurantID });
      const updateData = {
        vatName: "Vat",
        vat: 0,
        vatAmount: 0,
        additionalCharges: [],
        additionalChargesAmount: 0,
      };
      if (vat) {
        updateData.vatName = vat.name;
        updateData.vat = vat.percent;
        updateData.vatAmount = (totalPrice * vat.percent) / 100;
      }
      if (additional) {
        updateData.additionalCharges = additional;
        updateData.additionalChargesAmount = additional.reduce(
          (t, { charge }) => t + +charge,
          0
        );
      }
      updateData.netPrice =
        totalPrice + updateData.vatAmount + updateData.additionalChargesAmount;

      await Order.updateOne({ _id, restaurantID }, { $set: updateData });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async printOrderDetails(req, res) {
    try {
      const { orderID } = req.query;
      const { restaurantID } = req.user;
      global.io.emit(`print-item-list-${restaurantID}`, orderID);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async fetchPrintOrder(req, res) {
    try {
      const { _id } = req.params;
      const order = await Order.findOne({ _id });
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async getOrder(req, res) {
    try {
      const { serial, slug } = req.query;
      const { email: userEmail } = req.user;
      const table = await Table.findOne({ serial });
      const restaurant = await Restaurant.findOne({ slug });
      const order = await Order.findOne({
        userEmail,
        restaurantID: restaurant._id,
        tableID: table._id,
        status: { $in: ["active", "pending"] },
      });
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async billRequest(req, res) {
    try {
      const { serial, slug } = req.query;
      const { email: userEmail } = req.user;
      const table = await Table.findOne({ serial });
      const restaurant = await Restaurant.findOne({ slug });
      const order = await Order.findOne({
        userEmail,
        restaurantID: restaurant._id,
        tableID: table._id,
        status: { $in: ["active", "pending"] },
      });
      const notification = await Notification.create({
        restaurantID: restaurant._id,
        type: "requestBill",
        additional: { orderID: order._id },
        title: `Requesting bill`,
        body: `Table: ${table.name} is requesting his bill`,
      });
      global.io.emit(`request-bill-${restaurant._id}`, notification);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async fetchOrderDetails(req, res) {
    try {
      const { restaurantID } = req.user;
      const { orderID: _id } = req.query;
      const order = await Order.findOne({ _id, restaurantID });
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = controller;
