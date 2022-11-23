const router = require("express").Router()
const controller = require("./cards.controller")

router
    .route("/")
    .post(controller.create)

router
    .route("/:card_id")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)

module.exports = router;