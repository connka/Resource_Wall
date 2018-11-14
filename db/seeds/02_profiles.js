exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('profiles').insert([
        {
          id: 1,
          user_id: '1',
          name: 'user1',
          email: 'user1@example.com',
          location: 'calgary'
        },
        {
          id: 2,
          user_id: '2',
          name: 'user2',
          email: 'user2@example.com',
          location: 'calgary'
        },
        {
          id: 3,
          user_id: '3',
          name: 'user3',
          email: 'user3@example.com',
          location: 'calgary'
        }
      ]);
    });
};
