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
        },
        {
          id: 4,
          user_id: '4',
          name: 'user4',
          email: 'user4@example.com',
          location: 'calgary'
        },
        {
          id: 5,
          user_id: '5',
          name: 'user5',
          email: 'user5@example.com',
          location: 'calgary'
        },
        {
          id: 6,
          user_id: '6',
          name: 'user6',
          email: 'user6@example.com',
          location: 'calgary'
        }
      ]);
    });
};
