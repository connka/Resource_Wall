exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_resourses')
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('user_resourses').insert({
          user_id: '1',
          resourse_id: '1'
        }),
        knex('user_resourses').insert({
          user_id: '2',
          resourse_id: '2'
        }),
        knex('user_resourses').insert({ id: 3, user_id: '3', resourse_id: '3' })
      ]);
    });
};
