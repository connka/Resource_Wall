exports.up = function(knex, Promise) {
  return knex.schema.createTable('intrests', function(table) {
    table.increments('id');
    table
      .string('name')
      .unique()
      .notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('intrests');
};
