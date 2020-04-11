const express = require("express")
const router = express.Router()
const Trade = require("../models/Trades")

router.get("/", async (req, res) => {
    try{
        const allTrades = await Trade.find({})
        const tradeList = []
        for (let i = 0; i < allTrades.length; i++){
            tradeList.push({
                team: allTrades[i].team,
                arrivals: allTrades[i].arrivals,
                departures: allTrades[i].departures,
                date: allTrades[i].date,
                id: allTrades[i]._id
            })
        }
        res.json(tradeList)
    }
    catch(err){
        console.log(err)
    }
})


router.post("/new", async (req, res) => {
    try{
        const tradeDbEntry = {}
        tradeDbEntry.team = req.body.team
        tradeDbEntry.arrivals = req.body.arrivals
        tradeDbEntry.departures = req.body.departures
        tradeDbEntry.date = req.body.date
        const newTrade = await Trade.create(tradeDbEntry)
        res.json({
            message: `Trade added.`
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