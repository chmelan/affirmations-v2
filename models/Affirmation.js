const mongoose = require("mongoose");

const affirmationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: String,
    tags: [String],
  },
  { timestamps: true }
);

const Affirmation = mongoose.model("Affirmation", affirmationSchema);

module.exports = Affirmation;
