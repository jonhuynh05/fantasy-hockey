const mongoose = require("mongoose")
const Schema = mongoose.Schema
const championSchema = new Schema ({
    recipient: String,
    year: String
})

const Champion = mongoose.model("Champion", championSchema)
module.exports = Champion