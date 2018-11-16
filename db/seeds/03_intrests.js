exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('intrests')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('intrests').insert([
        { id: 1, name: 'sports' },
        { id: 2, name: 'web development' },
        { id: 3, name: 'food' },
        { id: 4, name: 'reading' },
        { id: 5, name: 'traveling' },
        { id: 6, name: 'fishing' },
        { id: 7, name: 'crafts' },
        { id: 8, name: 'movies' },
        { id: 9, name: 'music' },
        { id: 10, name: 'gardening' },
        { id: 11, name: 'games' },
        { id: 12, name: 'hunting' },
        { id: 13, name: 'restaurants' },
        { id: 14, name: 'cars' }
      ]);
    });
};
