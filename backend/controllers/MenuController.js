const {
  Restaurant,
  Category,
  SubCategory,
  Item,
  Table,
} = require("@/backend/models");

const controller = {
  async fetchMenu(req, res) {
    try {
      const { slug, table } = req.query;
      const restaurant = await Restaurant.findOne({
        slug,
        scanExp: { $gt: new Date() },
      }).select({
        logo: 1,
        name: 1,
      });
      const findTable = await Table.findOne({
        restaurantID: restaurant._id,
        serial: table,
      });
      const categories = await Category.find({
        restaurantID: restaurant._id,
      }).sort({ serial: 1 });
      const subCategories = await SubCategory.find({
        restaurantID: restaurant._id,
      }).sort({ serial: 1 });
      const items = await Item.find({
        restaurantID: restaurant._id,
      }).sort({ serial: -1 });
      res.status(200).json({
        restaurant,
        categories,
        subCategories,
        items,
        table: findTable,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = controller;
