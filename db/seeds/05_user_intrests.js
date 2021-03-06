exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_intrests')
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('user_intrests').insert({
          user_id: '1',
          intrest_id: '1'
        }),
        knex('user_intrests').insert({ user_id: '2', intrest_id: '2' }),
        knex('user_intrests').insert({ user_id: '3', intrest_id: '3' })
      ]);
    });
};
