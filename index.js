const exp = require("constants");
const express = require("express");
const path = require("path");
const routes = require("./routes");

require("dotenv").config()

const app = express()


app.use(routes)
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running`)
})
