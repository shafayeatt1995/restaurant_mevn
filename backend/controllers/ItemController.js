const { Item } = require("@/backend/models");
const { paginate } = require("@/backend/utils");
const { stringSlug, randomKey } = require("@/backend/utils");

const controller = {
  async fetchItem(req, res) {
    try {
      const { page, perPage } = req.query;

      const items = await Item.aggregate([
        ...paginate(page, perPage),
        { $sort: { _id: -1 } },
        {
          $lookup: {
            from: "categories",
            localField: "categoryID",
            foreignField: "_id",
            as: "category",
          },
        },
      ]);
      res.status(200).json({ items });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  async getItem(req, res) {
    try {
      const { _id } = req.params;

      const item = await Item.findOne({ _id });
      res.status(200).json({ item });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async createItem(req, res) {
    try {
      let {
        categoryID,
        name,
        image,
        ingredient,
        price,
        discount,
        discountAmount,
        description,
        estimateTime,
        variant,
        status,
      } = req.body;
      variant = variant.map((val) => ({ name: val }));
      const slug = stringSlug("name") + randomKey();
      const { restaurantID } = req.user;
      await Item.create({
        restaurantID,
        categoryID,
        name,
        image,
        ingredient,
        price,
        discount,
        discountAmount,
        description,
        estimateTime,
        variant,
        status,
        slug,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async updateItem(req, res) {
    try {
      let {
        categoryID,
        name,
        image,
        ingredient,
        price,
        discount,
        discountAmount,
        description,
        estimateTime,
        variant,
        status,
        _id,
      } = req.body;
      variant = variant.map((val) => ({ name: val }));
      const slug = stringSlug("name") + randomKey();
      await Item.updateOne(
        { _id },
        {
          categoryID,
          name,
          image,
          ingredient,
          price,
          discount,
          discountAmount,
          description,
          estimateTime,
          variant,
          status,
          slug,
        }
      );

      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async deleteItem(req, res) {
    try {
      const { _id } = req.query;
      const { restaurantID } = req.user;

      const data = await Category.deleteOne({ _id, restaurantID });
      console.log(data);
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
