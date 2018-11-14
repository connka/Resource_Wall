exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_likes')
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('user_likes').insert({
          id: 1,
          user_id: '1',
          resourse_id: '3'
        }),
        knex('user_likes').insert({
          id: 2,
          user_id: '2',
          resourse_id: '1'
        }),
        knex('user_likes').insert({ id: 3, user_id: '3', resourse_id: '2' })
      ]);
    });
};
