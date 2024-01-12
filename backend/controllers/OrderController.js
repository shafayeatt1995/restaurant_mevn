const { Order } = require("@/backend/models");
const { paginate } = require("@/backend/utils");

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

          await Order.updateOne(
            {
              restaurantID,
              tableID,
              userEmail,
            },
            {
              $push: { orderItems: newItem },
              $set: {
                totalPrice: checkOrder.totalPrice + calcTotalPrice(orderItems),
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
            }
          );
          global.io.emit(`order-notification-${restaurantID}`);
          res.status(200).json({ success: true });
        } else {
          res.status(500).json({
            success: false,
            message: `Sorry, Someone has already ordered from this table. Please ask a waiter for help`,
          });
        }
      } else {
        const data = await Order.create({
          userEmail,
          userName,
          restaurantID,
          tableID,
          tableName,
          orderItems,
          totalPrice: calcTotalPrice(orderItems),
          netPrice: calcTotalPrice(orderItems) - calcTotalDiscount(orderItems),
          totalDiscount: calcTotalDiscount(orderItems),
          totalQty: totalQuantity(orderItems),
          note,
          orderType,
        });
        global.io.emit(`order-notification-${restaurantID}`);
        res.status(200).json({ success: true });
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
      console.log(matchQuery);

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
      const { _id: waiterID, restaurantID } = req.user;
      const updateData = { status };
      if (currentStatus === "pending") {
        const checkExist = await Order.findOne({
          _id,
          restaurantID,
          waiterID: { $exists: true },
        });
        if (checkExist) {
          res.status(422).json({
            success: false,
            message: "Someone already received this order",
          });
        } else {
          updateData.waiterID = waiterID;
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
