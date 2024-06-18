const knex = require("knex")(require("../db/knexfile").development);

module.exports = {
  getVolcanoesByCountry(country, populatedWithin) {
    let query = knex("data").where("country", country);
    if (populatedWithin) {
      query = query.where(`population_${populatedWithin}`, ">", 0);
    }

    query = query.select("id", "name", "country", "region", "subregion");
    return query;
  },
};
