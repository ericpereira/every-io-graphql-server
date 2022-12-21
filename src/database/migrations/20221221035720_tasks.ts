import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tasks', function (table) {
        table.increments('id');
        table.string('title', 255).notNullable();
        table.string('description', 255);
        table.string('status', 255);
        table.datetime('createdAt').notNullable().defaultTo(knex.fn.now());
        table.datetime('updatedAt');
        table.datetime('disabledAt');
        table.integer('userId').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
      .dropTable("tasks");
}

