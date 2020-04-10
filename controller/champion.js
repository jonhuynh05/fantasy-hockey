const express = require("express")
const router = express.Router()
const Champion = require("../models/Champions")

router.post("/new", async (req, res) => {
    try{
        console.log(req.body)
        const championDbEntry = {}
        championDbEntry.recipient = req.body.recipient
        championDbEntry.year = req.body.year
        const newChampion = await Champion.create(championDbEntry)
        res.json({
            message: `${newChampion.recipient} added.`
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router