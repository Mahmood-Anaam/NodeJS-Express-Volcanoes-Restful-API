const knex = require('knex')(require('../db/knexfile').development);
module.exports = {
  insertComment(comment) {
    return knex('comments').insert(comment);
  },
  getCommentsByVolcanoId(volcano_id) {
    return knex('comments')
      .where('volcano_id', volcano_id)
      .orderBy('created_at', 'desc');
  },
  getAverageRating(volcano_id) {
    return knex('comments')
      .where('volcano_id', volcano_id)
      .avg('rating as averageRating')
      .first();
  },

  checkVolcanoExists(volcano_id) {
    return knex('data')
      .where('id', volcano_id)
      .first()
      .then(volcano => !!volcano);
  }




};
