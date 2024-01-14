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
      const restaurant = await Restaurant.findOne({ slug }).select({
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
        table: findTable || {
          restaurantID: "655dbbb2860b71a2dabec31f",
          name: "table-8",
          serial: "table-8-rh",
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

module.exports = controller;
