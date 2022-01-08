const mongoose = require("mongoose");

const Track = new mongoose.Schema({
    name: String,
    length: String,
})

const Vinyls = new mongoose.Schema({
    title: String,
    artist: String,
    year: Number,
    albumart: String,
    tracklist: [Track]
})

module.exports = mongoose.model('Vinyls', Vinyls);

