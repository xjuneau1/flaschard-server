const router = require("express").Router()
const controller = require("./decks.controller")

router
    .route("/")
    .get(controller.list)
    .post(controller.create)

router
    .route("/:deck_id")
    .get(controller.read)
    .put(controller.update)
    // .delete(controller.destroy)

module.exports = router;