const knex = require('knex')(require('../db/knexfile').development);

module.exports = {
    getCountries() {
      return knex('data').distinct('country').orderBy('country');
    }
};