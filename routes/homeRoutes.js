const router = require("express").Router()
const path = require("path")
require('dotenv').config()

router.post("/login", (req, res) => {
    console.log("Login attempt");
    if(req.body.username === process.env.USER &&
        req.body.password === process.env.PASSWORD) {
            console.log("Login success")
            res.json({jwt: process.env.JWT})
    } else {
        console.log("Login failed");
        res.json({error:"Invalid login"});
    }
})

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
})

module.exports = router