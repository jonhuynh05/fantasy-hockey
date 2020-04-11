const mongoose = require("mongoose")
const Schema = mongoose.Schema
const draftYearSchema = new Schema ({
    year: String,
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Draft"
    }]
})

const DraftYear = mongoose.model("DraftYear", draftYearSchema)
module.exports = DraftYear