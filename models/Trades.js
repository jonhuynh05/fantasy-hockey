const mongoose = require("mongoose")
const Schema = mongoose.Schema
const tradesSchema = new Schema ({
    team: String,
    arrivals: String,
    departures: String,
    date: String
})

const Trade = mongoose.model("Trade", tradesSchema)
module.exports = Trade