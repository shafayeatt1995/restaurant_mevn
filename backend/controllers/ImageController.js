const { Blob } = require("buffer");
const { Image } = require("@/backend/models");
const { paginate, utapi, randomKey } = require("@/backend/utils");

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
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async uploadImage(req, res) {
    try {
      const { _id: userID } = req.user;
      const filename = `${randomKey(3)}-${userID}`;
      const blob = new Blob([req.files.image.data], {
        type: "application/octet-stream",
      });
      const uploadData = Object.assign(blob, { name: filename });

      const { data } = await utapi.uploadFiles(uploadData);
      const { url, size, key } = data;
      await Image.create({ userID, url, size, key });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async deleteImage(req, res) {
    try {
      const { keyList } = req.query;

      const data = await utapi.deleteFiles(keyList);
      await Image.deleteMany({ key: { $in: keyList } });

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
