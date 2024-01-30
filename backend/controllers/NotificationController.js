const { Notification } = require("@/backend/models");
const { paginate } = require("@/backend/utils");

const controller = {
  async fetchNotification(req, res) {
    try {
      const { restaurantID } = req.user;
      const { page, perPage } = req.query;
      const [notification, unread] = await Promise.all([
        await Notification.aggregate([
          { $match: { restaurantID } },
          { $sort: { created_at: -1 } },
          ...paginate(page, perPage),
        ]),
        await Notification.countDocuments({ restaurantID, mark: false }),
      ]);
      res.status(200).json({ notification, unread });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async fetchNewNotification(req, res) {
    try {
      const { restaurantID } = req.user;

      const notification = await Notification.findOne(
        { restaurantID },
        {},
        { created_at: -1 }
      );
      res.status(200).json({ notification });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async toggleNotification(req, res) {
    try {
      const { restaurantID } = req.user;
      const { notificationID: _id } = req.query;
      await Notification.updateOne({ _id, restaurantID }, { mark: true });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async markAllNotification(req, res) {
    try {
      const { restaurantID } = req.user;
      await Notification.updateMany({ restaurantID }, { mark: true });
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
