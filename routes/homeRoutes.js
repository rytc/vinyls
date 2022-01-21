const router = require("express").Router()
const path = require("path")
require('dotenv').config()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
})

router.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
})

router.post("/login", (req, res) => {
    console.log("Login attempt");
    if(req.body.username === process.env.USER &&
        req.body.password === process.env.PASSWORD) {
            console.log("Login success")
            res.json({jwt: process.env.JWT})
    } else {
        console.log("Login failed");
        res.sendStatus(500);
    }
})
module.exports = router