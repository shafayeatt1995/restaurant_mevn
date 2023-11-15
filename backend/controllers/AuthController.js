const jwt = require("jsonwebtoken");
const { User } = require("@/backend/models");

const auth = {
  async signup(req, res) {
    try {
      // req.body.email = req.body.email.toLowerCase().trim();
      // const { code, email, first_name, other, promote_option, affiliate_id } =
      //   req.body;
      console.log("ami anik");

      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Unknown error occurred" });
    }
  },

  async login(req, res) {
    const { _id, email, affiliate_id } = req.user;
    const token = jwt.sign(
      { _id, email, affiliate_id },
      process.env.AFFILIATE_AUTH_SECRET,
      { expiresIn: "30 days" }
    );
    res.status(200).json({ success: true, token });
  },

  async getProfile(req, res) {
    try {
      const user = await AffiliateUser.findOne({
        email: req.affiliate_user.email,
      });
      res.status(200).json({ success: true, user });
    } catch (err) {
      res.status(404).json({ success: false, message: "User not found" });
    }
  },

  async logout(req, res) {
    res.status(200).json({ success: true, message: "Logout successful" });
  },
};

module.exports = auth;
