const Affirmation = require("../models/Affirmation");
/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  const affirmation = await Affirmation.findOne();
  res.render("home", {
    title: "Home",
    affirmation,
  });
};
