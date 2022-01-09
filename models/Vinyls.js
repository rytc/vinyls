const mongoose = require("mongoose");

const Vinyls = new mongoose.Schema({
    upc: String,
    master_id: String,
    title: String,
    artists: [String],
    albumart: String
})

module.exports = mongoose.model('Vinyls', Vinyls);

