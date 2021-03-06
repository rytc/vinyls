const exp = require("constants");
const express = require("express");
const path = require("path");
const routes = require("./routes");
const mongoose = require("mongoose");

require("dotenv").config()

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(routes)

app.listen(process.env.PORT || 3001, async () => {
    try {
        await mongoose.connect(process.env.ATLASDB_URL);

    } catch(err) {
        console.log(err)
    }
    console.log(`Server running`)
})

