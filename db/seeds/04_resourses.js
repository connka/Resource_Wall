exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resourses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('resourses').insert([
        {
          id: 1,
          url: 'https://knexjs.org/',
          title: 'knexjs',
          description: 'knex js for database query',
          intrest_id: '2'
        },
        {
          id: 2,
          url: 'https://www.foodnetwork.ca/',
          title: 'food network canada',
          description: 'food network canada',
          intrest_id: '3'
        },
        {
          id: 3,
          url: 'https://www.nhl.com/flames',
          title: 'Calgary flames',
          description: 'Calgary flames nhl page',
          intrest_id: '1'
        }
      ]);
    });
};
