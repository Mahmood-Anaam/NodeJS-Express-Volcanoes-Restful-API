const Volcanoes = require("../models/volcanoesModel");

const getVolcanoes = async (req, res, next) => {
  try {
    const { country, populatedWithin, ...otherQueries } = req.query;

    // Check for invalid query parameters
    const validQueries = ["country", "populatedWithin"];
    const invalidQueries = Object.keys(otherQueries).filter(
      (param) => !validQueries.includes(param)
    );
    if (invalidQueries.length > 0) {
      return res.status(400).json({
        error: true,
        message:
          "Invalid query parameters. Only country and populatedWithin are permitted.",
      });
    }

    // Check for missing country parameter
    if (!country) {
      return res.status(400).json({
        error: true,
        message: "Country is a required query parameter.",
      });
    }

    // Check for invalid populatedWithin parameter
    const validDistances = ["5km", "10km", "30km", "100km"];
    if (populatedWithin && !validDistances.includes(populatedWithin)) {
      return res.status(400).json({
        error: true,
        message:
          "Invalid value for populatedWithin. Only: 5km, 10km, 30km, 100km are permitted.",
      });
    }

    const volcanoes = await Volcanoes.getVolcanoesByCountry(
      country,
      populatedWithin
    );

    res.status(200).json(volcanoes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getVolcanoes,
};
