const express = require("express")
const router = express.Router()
const Home = require("../models/Home")

router.get("/", async (req, res) => {
    console.log("hi")
})

module.exports = router