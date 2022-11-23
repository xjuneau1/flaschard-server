const knex = require("../db/connection")

function list(){
    return knex("decks").select("*")
}

function create(deck){
    return knex("decks")
        .insert(deck)
        .returning("*")
        .then((createdRecords)=> createdRecords[0])
}

function read(deck_id){
    return knex("decks")
        .select("*")
        .where({deck_id})
        .first()
}

function update(updatedDeck){
    return knex("decks")
        .select("*")
        .where({deck_id: updatedDeck.deck_id})
        .update(updatedDeck, "*")
        .then((updatedRecords)=> updatedRecords[0])
}

function destroy(deck_id){
    return knex("decks")
        .where({deck_id})
        .del()
}

module.exports = {
    list,
    create,
    read,
    update,
    destroy
}