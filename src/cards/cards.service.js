const knex = require("../db/connection")

function list(){
    return knex("cards")
        .select("*")
}

function read(card_id){
    return knex("cards")
        .select("*")
        .where({card_id})
        .returning("*")
        .first()
}

function update(updatedCard){
    return knex("cards")
        .select("*")
        .where({card_id: updatedCard.card_id})
        .update(updatedCard, "*")
        .then((updatedRecords)=> updatedRecords[0])
}

function destroy(card_id){
    return knex("cards")
        .where({card_id})
        .del()
}

function create(card){
    return knex("cards")
    .insert(card)
    .returning("*")
    .then((createdRecords)=> {
        return createdRecords[0]
    })
}

function getCardsByDeckId(deck_id){
    return knex("cards")
        .select("*")
        .where({deck_id})
        .returning("*")
}

module.exports = {
    list,
    read,
    update,
    create,
    destroy,
    getCardsByDeckId
}