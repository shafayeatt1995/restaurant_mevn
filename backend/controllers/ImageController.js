const fs = require("fs");
const path = require("path");
const { Image } = require("@/backend/models");
const paginate = require("@/backend/utils/paginate");
const directory = "./static/uploads/";

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
      {
        $sort: { _id: -1 },
      },
      ...paginate(page, perPage),
    ]);

    res.status(200).json({ success: true, images });
  },
  async uploadImage(req, res) {
    const { _id: userID } = req.user;
    const url = req.file.path.replace("static", "");
    const size = req.file.size;
    await Image.create({ userID, url, size });

    res.status(200).json({ success: true });
  },
  async deleteImage(req, res) {
    const { urlList } = req.query;
    const urls = urlList.filter((val) => {
      const filePath = directory + path.basename(val);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          return err ? false : true;
        });
      } else {
        return true;
      }
    });
    await Image.deleteMany({ url: { $in: urls } });
    res.status(200).json({ success: true });
  },
};

module.exports = obj;
