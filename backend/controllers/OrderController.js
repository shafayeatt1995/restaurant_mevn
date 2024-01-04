const { Order } = require("@/backend/models");

const controller = {
  async createOrder(req, res) {
    try {
      const {
        userID,
        restaurantID,
        tableID,
        orderItems,
        totalPrice,
        netPrice,
        totalDiscount,
        totalQty,
        note,
        orderType,
      } = req.body;

      // await Order.create({
      //   userID,
      //   restaurantID,
      //   tableID,
      //   orderItems,
      //   totalPrice,
      //   netPrice,
      //   totalDiscount,
      //   totalQty,
      //   note,
      //   orderType,
      // });
      global.io.emit(`order-notification-${restaurantID}`);
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
