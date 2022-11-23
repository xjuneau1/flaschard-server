const service = require("./decks.service");
const cardsService = require("../cards/cards.service");
const hasProperties = require("../validation/hasProperties");
const hasRequiredProperties = hasProperties("name", "description");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  let decks = await service.list();
  let decksWithCards = [];
  for (const deck of decks) {
    const cards = await cardsService.getCardsByDeckId(deck.deck_id);
    decksWithCards.push({ ...deck, cards: cards });
  }
  res.status(200).json({data: decksWithCards});
}

const VALID_PROPERTIES = ["name", "description"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function create(req, res) {
  const newDeck = await service.create(req.body.data);
  res.status(201).json({data: newDeck});
}

async function deckExists(req, res, next) {
  const deck = await service.read(req.params.deck_id);
  if (deck) {
    res.locals.deck = deck;
    return next();
  }
  next({
    status: 404,
    message: `Deck with ID: "${req.params.deck_id}" not found.`,
  });
}

async function read(req, res) {
  const { deck } = res.locals;
  const cards = await cardsService.getCardsByDeckId(deck.deck_id);
  res.json({data: { ...deck, cards: cards }});
}

async function update(req, res) {
  const { deck_id } = res.locals.deck;
  const updatedDeck = {
    ...req.body.data,
    deck_id: deck_id,
  };
  const updatedRecord = await service.update(updatedDeck);
  res.json({data: updatedRecord});
}

async function destroy(req, res){
  const { deck } = res.locals
  await service.destroy(deck.deck_id)
  res.sendStatus(204)
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(deckExists), read],
  update: [
    asyncErrorBoundary(deckExists),
    hasRequiredProperties,
    hasOnlyValidProperties,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(deckExists),
    asyncErrorBoundary(destroy)
  ]
};
