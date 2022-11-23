const express = require("express")
const cors = require("cors")
const app = express()

const decksRouter = require("../src/decks/decks.router")
const cardsRouter = require("../src/cards/cards.router")
app.use(express.json())
app.use(cors())

app.use("/decks", decksRouter)
app.use("/cards", cardsRouter)

module.exports = app;