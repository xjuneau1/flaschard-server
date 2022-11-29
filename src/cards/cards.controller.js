const service = require("./cards.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../validation/hasProperties");
const hasRequiredProperties = hasProperties("front", "back");

// async function list(req, res, next) {
//   const cards = await service.list();
//   if (cards) {
//     res.locals.cards = cards;
//     return next();
//   }
//   next({
//     status: 404,
//     message: "No cards found, or no cards have been created yet.",
//   });
// }

async function cardExists(req, res, next) {
  const card = await service.read(req.params.card_id);
  if (card) {
    res.locals.card = card;
    return next();
  }
  next({
    status: 404,
    message: `Card with the ID: "${req.params.card_id}" not found.`,
  });
}

function read(req, res, next) {
  res.status(200).json(res.locals.card);
}

const VALID_PROPERTIES = ["front", "back"];

function hasOnlyValidProperties(req, res, next) {
  const { body = {} } = req;

  const invalidFields = Object.keys(body).filter(
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

async function create(req, res, next) {
  const createdCard = await service.create(req.body);
  res.status(201).json(createdCard);
}

async function update(req, res, next) {
  const updatedRecord = await service.update(req.body);
  res.json(updatedRecord);
}

async function destroy(req, res, next){
    const {card} = res.locals
    await service.destroy(card.card_id)
    res.sendStatus(204)
}

module.exports = {
  read: [asyncErrorBoundary(cardExists), read],
  create: [
    //hasRequiredProperties,
    //hasOnlyValidProperties,
    asyncErrorBoundary(create),
  ],
  update: [asyncErrorBoundary(cardExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(cardExists), asyncErrorBoundary(destroy)]
};
