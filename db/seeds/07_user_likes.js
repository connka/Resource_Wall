exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_likes')
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('user_likes').insert({
          user_id: '1',
          resourse_id: '1'
        })
      ]);
    });
};
