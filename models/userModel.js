const knex = require('knex')(require('../db/knexfile').development);

module.exports = {
  createUser(user) {
    return knex('users').insert(user);
  },
  findUserByEmail(email) {
    return knex('users').where('email', email).first();
  },
  updateUserProfile(email, profile) {
    return knex('users').where('email', email).update(profile);
  }
};
