const { User, Image } = require("@/backend/models");
const paginate = require("@/backend/utils/paginate");

const obj = {
  async fetchImage(req, res) {
    const { _id } = req.user;
    const { page, perPage } = req.query;

    const images = await Image.aggregate([
      {
        $match: {
          userID: _id,
        },
      },
      ...paginate(page, perPage),
    ]);

    res.status(200).json({ success: true, images });
  },
};

module.exports = obj;
