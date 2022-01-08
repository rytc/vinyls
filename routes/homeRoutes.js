const router = require("express").Router()
const path = require("path")

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

router.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

module.exports = router