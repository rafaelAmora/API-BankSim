import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(),
      table.text("name").notNullable(),
      table.text("email").notNullable().unique(),
      table.text("password_hash").notNullable(),
      table.timestamp("created_at").defaultTo(knex.fn.now()),
      table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users")
}
