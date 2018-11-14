exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id');
      table
        .string('username')
        .unique()
        .notNullable();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('profiles', function(table) {
      table.increments('id');
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNull()
        .onDelete('cascade');
      table.string('name');
      table.string('email');
      table.string('location');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles').dropTable('users');
};
