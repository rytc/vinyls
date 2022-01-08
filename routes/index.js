const router = require("express").Router()

router.use("/api", require("./apiRoutes.js"))

module.exports = router