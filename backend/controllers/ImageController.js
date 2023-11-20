const fs = require("fs");
const path = require("path");
const { Image } = require("@/backend/models");
const { paginate } = require("@/backend/utils");

const controller = {
  async fetchImage(req, res) {
    try {
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
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async uploadImage(req, res) {
    try {
      const { _id: userID } = req.user;
      const { path, size } = req.file;
      const url = path.replace("static", "");
      await Image.create({ userID, url, size });

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async deleteImage(req, res) {
    try {
      const { urlList } = req.query;
      const directory = "./static/uploads/";

      urlList.map((val) => {
        const filePath = directory + path.basename(val);
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            return err ? false : true;
          });
        } else {
          return true;
        }
      });

      await Image.deleteMany({ url: { $in: urlList } });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = controller;
