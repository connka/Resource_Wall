exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_comments')
    .del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('user_comments').insert({
          text: 'great resourse!!!!',
          user_id: '1',
          resourse_id: '1'
        }),
        knex('user_comments').insert({
          text: 'loved it ,sharemore like these',
          user_id: '2',
          resourse_id: '1'
        }),
        knex('user_comments').insert({
          text: 'i do not agree with the author',
          user_id: '3',
          resourse_id: '1'
        }),
        knex('user_comments').insert({
          text: 'great resourse!!!!',
          user_id: '1',
          resourse_id: '2'
        }),
        knex('user_comments').insert({
          text: 'loved it ,sharemore like these',
          user_id: '2',
          resourse_id: '2'
        }),
        knex('user_comments').insert({
          text: 'i do not agree with the author',
          user_id: '3',
          resourse_id: '2'
        })
      ]);
    });
};
