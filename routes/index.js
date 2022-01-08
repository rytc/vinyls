const router = require("express").Router()

router.use("/", require("./homeRoutes.js"))
router.use("/api", require("./apiRoutes.js"))

module.exports = router