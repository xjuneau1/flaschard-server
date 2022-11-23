const knex = require("../db/connection")

function getCardsByDeckId(deck_id){
    return knex("cards")
        .select("*")
        .where({deck_id})
        .returning("*")
}

module.exports = {
    getCardsByDeckId
}