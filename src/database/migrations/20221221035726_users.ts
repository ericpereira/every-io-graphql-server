import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', function (table) {
        table.increments('id');
        table.string('firstName', 255).notNullable();
        table.string('lastName', 255);
        table.string('email', 255);
        table.string('password', 255);
        table.datetime('createdAt');
        table.string('token');
    })
}


export async function down(knex: Knex): Promise<void> {
}

