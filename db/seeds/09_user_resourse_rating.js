exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_resourse_rating')
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('user_resourse_rating').insert({
          id: 1,
          rating: '4',
          user_id: '1',
          resourse_id: '3'
        }),
        knex('user_resourse_rating').insert({
          id: 2,
          rating: '3',
          user_id: '2',
          resourse_id: '1'
        }),
        knex('user_resourse_rating').insert({
          id: 3,
          rating: '5',
          user_id: '3',
          resourse_id: '2'
        })
      ]);
    });
};
