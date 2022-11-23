const express = require("express")
const app = express()

const decksRouter = require("../src/decks/decks.router")
const cardsRouter = require("../src/cards/cards.router")
app.use(express.json())

app.use("/decks", decksRouter)
app.use("/cards", cardsRouter)

module.exports = app;