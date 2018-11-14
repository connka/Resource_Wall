exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('intrests')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('intrests').insert([
        { id: 1, name: 'sports' },
        { id: 2, name: 'web development' },
        { id: 3, name: 'Food' }
      ]);
    });
};
