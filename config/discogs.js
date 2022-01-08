const Discogs = require('disconnect').Client;
require('dotenv').config()

module.exports = new Discogs({consumerKey: process.env.DISCOGS_KEY, consumerSecret: process.env.DISCOGS_SECRET});
