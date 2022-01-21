const router = require("express").Router()


router.use("/api", require("./apiRoutes.js"))
router.use("/", require("./homeRoutes.js"))

module.exports = router