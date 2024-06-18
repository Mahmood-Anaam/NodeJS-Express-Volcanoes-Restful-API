const Volcano = require("../models/volcanoModel");

const getVolcano = async (req, res, next) => {
  try {
    const { id, ...otherQueries } = req.params;
    // Check for invalid query parameters
    const validQueries = ["id"];
    const invalidQueries = Object.keys(otherQueries).filter(
      (param) => !validQueries.includes(param)
    );

    if (!id || isNaN(id) || invalidQueries.length > 0) {
      return res.status(400).json({
        error: true,
        message:
          "Invalid query parameters. Query parameters are not permitted.",
      });
    }

    const includePopulation = req.user ? true : false;
    const volcano = await Volcano.getVolcanoById(id, includePopulation);

    if (!volcano) {
      return res.status(404).json({
        error: true,
        message: `Volcano with ID: ${id} not found.`,
      });
    }

    res.status(200).json(volcano);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getVolcano,
};
