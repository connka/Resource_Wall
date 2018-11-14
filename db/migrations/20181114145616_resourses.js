exports.up = function(knex, Promise) {
  return knex.schema.createTable('resourses', function(table) {
    table.increments('id');
    table
      .string('url')
      .unique()
      .notNullable();
    table
      .string('title')
      .unique()
      .notNullable();
    table
      .string('description')
      .unique()
      .notNullable();
    table
      .integer('intrest_id')
      .references('id')
      .inTable('intrests');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('resourses');
};
