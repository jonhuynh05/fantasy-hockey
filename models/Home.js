const mongoose = require("mongoose")
const Schema = mongoose.Schema
const homeSchema = new Schema ({
    imgURL: String
})

const Home = mongoose.model("Home", homeSchema)
module.exports = Home