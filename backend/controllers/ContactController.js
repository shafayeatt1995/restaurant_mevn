const { Contact } = require("@/backend/models");

const controller = {
  async createMessage(req, res) {
    try {
      const { name, email, message } = req.body;

      await Contact.create({ name, email, message });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },
};

module.exports = controller;
