const knex = require("knex")(require("../db/knexfile").development);

const getVolcanoById = (id, includePopulation) => {
  const baseSelection = [
    "id",
    "name",
    "country",
    "region",
    "subregion",
    "last_eruption",
    "summit",
    "elevation",
    knex.raw("CAST(latitude AS CHAR) AS latitude"),
    knex.raw("CAST(longitude AS CHAR) AS longitude"),
  ];

  if (includePopulation) {
    baseSelection.push(
      "population_5km",
      "population_10km",
      "population_30km",
      "population_100km"
    );
  }

  return knex("data").select(baseSelection).where("id", id).first();
};

module.exports = {
  getVolcanoById,
};
