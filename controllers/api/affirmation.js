const Affirmation = require("../../models/Affirmation");

exports.getAffirmations = async (req, res) => {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  if (endIndex < (await Affirmation.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }
  try {
    results.results = await Affirmation.find()
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.paginatedResults = results;
    res.json(res.paginatedResults);
  } catch (e) {
    res.status(500).send("404: Affirmations not found");
  }
};

exports.getAffirmationById = async (req, res) => {
  Affirmation.findById(req.params.id, (err, affirmation) => {
    if (err) {
      res.status(404).send("404: Affirmation not found");
    } else {
      res.status(200).send(affirmation);
    }
  });
};
