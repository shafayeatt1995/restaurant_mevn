const { Blob } = require("buffer");
const { Image, Restaurant } = require("@/backend/models");
const { paginate, utapi, randomKey } = require("@/backend/utils");
const moment = require("moment");
const sharp = require("sharp");

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
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },

  async uploadImage(req, res) {
    try {
      const { _id: userID } = req.user;
      const count = await Image.countDocuments({ userID });
      const restaurant = await Restaurant.findOne({ userID });
      if (restaurant) {
        if (count < 200) {
          const imageBuffer = req.files.image.data;
          const metadata = await sharp(imageBuffer).metadata();
          const shouldResize = metadata.width > 1000 || metadata.height > 768;
          const webpBuffer = shouldResize
            ? await sharp(imageBuffer)
                .resize({
                  width: 1000,
                  height: 768,
                  fit: sharp.fit.inside,
                  withoutEnlargement: true,
                })
                .webp()
                .toBuffer()
            : await sharp(imageBuffer).webp().toBuffer();

          const filename = `${randomKey(3)}-${userID}`;
          const blob = new Blob([webpBuffer], {
            type: "application/octet-stream",
          });
          const uploadData = Object.assign(blob, { name: filename });

          const { data } = await utapi.uploadFiles(uploadData);
          const { url, size, key } = data;
          await Image.create({ userID, url, size, key });
        } else {
          return res.status(422).json({ success: false });
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Something wrong. Please try again" });
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
        .json({ success: false, message: "Something wrong. Please try again" });
    }
  },
};

module.exports = controller;
