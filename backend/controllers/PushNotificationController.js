const { PushNotification } = require("@/backend/models");
const { verifyCookieToken } = require("@/backend/utils");
const webPush = require("web-push");

const controller = {
  async sendNotification(req, res) {
    try {
      const { _id: userID } = req.user;
      const data = await PushNotification.findOne({ userID });
      await webPush.sendNotification(data.subscription, "Ami anik");
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  async updateData(req, res) {
    try {
      const { endpoint, expirationTime, keys } = req.body;
      const fullToken = req.cookies["auth._token.cookie"] || "";
      if (endpoint && keys && fullToken) {
        const { _id: userID, email } = await verifyCookieToken(fullToken);
        await PushNotification.findOneAndUpdate(
          { userID, email },
          {
            $set: {
              userID,
              email,
              subscription: { endpoint, expirationTime, keys },
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ success: true });
      } else {
        throw new Error("invalid data");
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = controller;