const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, index: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "/images/avatar/1.png" },
    suspended: { type: Boolean, default: false },
    power: { type: Number, default: 1 },
    type: {
      type: String,
      enum: ["admin", "owner", "waiter", "user"],
      default: "user",
    },
    socialAccount: { type: Boolean, default: false },
    provider: { type: String },
    scanExp: { type: Date },
    analyticsExp: { type: Date },
  },
  {
    strict: true,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
