const { Order } = require("@/backend/models");
const { paginate } = require("@/backend/utils");

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
        totalPrice,
        netPrice,
        totalDiscount,
        totalQty,
        note,
        orderType,
      } = req.body;

      const data = await Order.create({
        userEmail,
        userName,
        restaurantID,
        tableID,
        tableName,
        orderItems,
        totalPrice,
        netPrice,
        totalDiscount,
        totalQty,
        note,
        orderType,
      });
      global.io.emit(`order-notification-${restaurantID}`, data);
      res.status(200).json({ success: true });
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
      const { _id, status } = req.query;
      const { _id: waiterID, restaurantID } = req.user;
      await Order.updateOne(
        {
          _id,
          restaurantID,
          $or: [{ waiterID: { $exists: false } }, { waiterID: null }],
        },
        { status, waiterID }
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
