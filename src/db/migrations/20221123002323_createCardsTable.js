/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("cards", (table)=>{
    table.increments("card_id").primary();
    table.string("front");
    table.string("back");
    table.integer("deck_id");
    table
        .foreign("deck_id")
        .references("deck_id")
        .inTable("decks")
        .onDelete("cascade")
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("cards");
};
