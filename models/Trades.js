const mongoose = require("mongoose")
const Schema = mongoose.Schema
const tradesSchema = new Schema ({
    team1: String,
    team2: String,
    acquisition1: String,
    acquisition2: String,
    date: String
})

const Trade = mongoose.model("Trade", tradesSchema)
module.exports = Trade