const Countries = require("../models/countriesModel");

exports.getCountries = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length > 0) {
      return res.status(400).json({
        error: true,
        message: "Invalid query parameters. Query parameters are not permitted.",
      });
    }

    const countries = await Countries.getCountries();
    const countryList = countries.map((c) => c.country);
    res.status(200).json(countryList);
  } catch (err) {
    next(err);
  }
};

