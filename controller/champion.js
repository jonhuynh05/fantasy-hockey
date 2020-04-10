const express = require("express")
const router = express.Router()
const Champion = require("../models/Champions")

router.get("/", async (req, res) => {
    try{
        const allChampions = await Champion.find({})
        const champList = []
        for (let i = 0; i < allChampions.length; i++){
            champList.push({
                recipient: allChampions[i].recipient,
                year: allChampions[i].year,
                id: allChampions[i]._id
            })
        }
        res.json(champList)
    }
    catch(err){
        console.log(err)
    }
})


router.post("/new", async (req, res) => {
    try{
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

router.delete("/remove", async (req, res) => {
    try{
        await Champion.findByIdAndDelete(req.body.id)
        res.json({
            message: "Removed."
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router