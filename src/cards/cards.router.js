const router = require("express").Router()
const controller = require("./cards.controller")

router
    .route("/")
    .get(controller.read)

module.exports = router;