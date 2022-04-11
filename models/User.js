const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    facebook: String,
    google: String,
    github: String,
    tokens: Array,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    profile: {
      name: String,
      apiKey: String,
      favoriteAffirmations: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
