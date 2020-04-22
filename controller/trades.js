const express = require("express")
const router = express.Router()
const Trade = require("../models/Trades")

router.get("/", async (req, res) => {
    try{
        const allTrades = await Trade.find({})
        const tradeList = []
        function compare(a, b){
            if(a.number < b.number){
                return -1
            }
            if(a.number > b.number){
                return 1
            }
            return 0
        }
        for (let i = 0; i < allTrades.length; i++){
            tradeList.push({
                number: allTrades[i].number,
                team1: allTrades[i].team1,
                team2: allTrades[i].team2,
                acquisition1: allTrades[i].acquisition1,
                acquisition2: allTrades[i].acquisition2,
                date: allTrades[i].date,
                id: allTrades[i]._id
            })
        }
        tradeList.sort(compare)
        res.json(tradeList)
    }
    catch(err){
        console.log(err)
    }
})


router.post("/new", async (req, res) => {
    try{
        const tradeDbEntry = {}
        tradeDbEntry.number = req.body.number
        tradeDbEntry.team1 = req.body.team1
        tradeDbEntry.team2 = req.body.team2
        tradeDbEntry.acquisition1 = req.body.acquisition1
        tradeDbEntry.acquisition2 = req.body.acquisition2
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
        await Trade.findByIdAndDelete(req.body.id)
        res.json({
            message: "Removed."
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router