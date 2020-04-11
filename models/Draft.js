const mongoose = require("mongoose")
const Schema = mongoose.Schema
const draftSchema = new Schema ({
    year: String,
    round: String,
    pick: String,
    team: String,
    selection: String
})

const Draft = mongoose.model("Draft", draftSchema)
module.exports = Draft