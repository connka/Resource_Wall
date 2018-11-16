exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_resourse_rating', function(table) {
    table.integer('rating').notNullable();
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('resourse_id')
      .references('id')
      .inTable('resourses');
    table.unique(['user_id', 'resourse_id']);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_resourse_rating');
};
