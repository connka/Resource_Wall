exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resourses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('resourses').insert([
        {
          url: 'https://knexjs.org/',
          title: 'knexjs',
          description: 'knex js for database query',
          intrest_id: '2'
        },
        {
          url: 'https://www.foodnetwork.ca/',
          title: 'food network canada',
          description: 'food network canada',
          intrest_id: '3'
        },
        {
          url: 'https://www.nhl.com/flames',
          title: 'Calgary flames',
          description: 'Calgary flames nhl page',
          intrest_id: '1'
        },
        {
          url: 'resourse 4',
          title: 'reourse 4',
          description: '4',
          intrest_id: '2'
        },
        {
          url: 'resourse 5',
          title: 'reourse 5',
          description: '5',
          intrest_id: '2'
        },
        {
          url: 'resourse 6',
          title: 'reourse 6',
          description: '6',
          intrest_id: '2'
        },
        {
          url: 'resourse 7',
          title: 'reourse 7',
          description: '7',
          intrest_id: '6'
        },
        {
          url: 'resourse 8',
          title: 'reourse 8',
          description: '8',
          intrest_id: '3'
        },
        {
          url: 'resourse 9',
          title: 'reourse 9',
          description: '9',
          intrest_id: '2'
        },
        {
          url: 'resourse 10',
          title: 'reourse 10',
          description: '10',
          intrest_id: '9'
        },
        {
          url: 'resourse 11',
          title: 'reourse 11',
          description: '11',
          intrest_id: '6'
        },
        {
          url: 'resourse 12',
          title: 'reourse 12',
          description: '12',
          intrest_id: '7'
        },

        {
          url: 'resourse 13',
          title: 'reourse 13',
          description: '13',
          intrest_id: '1'
        },
        {
          url: 'resourse 14',
          title: 'reourse 14',
          description: '14',
          intrest_id: '5'
        },
        {
          url: 'resourse 15',
          title: 'reourse 15',
          description: '15',
          intrest_id: '8'
        },
        {
          url: 'resourse 16',
          title: 'reourse 16',
          description: '16',
          intrest_id: '11'
        },
        {
          url: 'resourse 17',
          title: 'reourse 17',
          description: '17',
          intrest_id: '5'
        },
        {
          url: 'resourse 18',
          title: 'reourse 18',
          description: '18',
          intrest_id: '6'
        },
        {
          url: 'resourse 19',
          title: 'reourse 19',
          description: '19',
          intrest_id: '3'
        },
        {
          url: 'resourse 20',
          title: 'reourse 20',
          description: '20',
          intrest_id: '7'
        },
        {
          url: 'resourse 21',
          title: 'reourse 21',
          description: '21',
          intrest_id: '7'
        },
        {
          url: 'resourse 22',
          title: 'reourse 22',
          description: '22',
          intrest_id: '11'
        },
        {
          url: 'resourse 23',
          title: 'reourse 23',
          description: '23',
          intrest_id: '8'
        },
        {
          url: 'resourse 24',
          title: 'reourse 24',
          description: '24',
          intrest_id: '5'
        },
        {
          url: 'resourse 25',
          title: 'reourse 25',
          description: '25',
          intrest_id: '8'
        }
      ]);
    });
};
