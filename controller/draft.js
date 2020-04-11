const express = require("express")
const router = express.Router()
const Draft = require("../models/Draft")

// router.get("/", async (req, res) => {
//     try{
//         const allTrades = await Trade.find({})
//         const tradeList = []
//         for (let i = 0; i < allTrades.length; i++){
//             tradeList.push({
//                 team: allTrades[i].team,
//                 arrivals: allTrades[i].arrivals,
//                 departures: allTrades[i].departures,
//                 date: allTrades[i].date,
//                 id: allTrades[i]._id
//             })
//         }
//         res.json(tradeList)
//     }
//     catch(err){
//         console.log(err)
//     }
// })


router.post("/new", async (req, res) => {
    try{
        const draftDbEntry = {}
        draftDbEntry.year = req.body.year
        draftDbEntry.round = req.body.round
        draftDbEntry.pick = req.body.pick
        draftDbEntry.team = req.body.team
        draftDbEntry.selection = req.body.selection
        const newDraft = await Draft.create(draftDbEntry)
        res.json({
            message: `Draft selection added.`
        })
    }
    catch(err){
        console.log(err)
    }
})

// router.delete("/remove", async (req, res) => {
//     try{
//         await Trade.findByIdAndDelete(req.body.id)
//         res.json({
//             message: "Removed."
//         })
//     }
//     catch(err){
//         console.log(err)
//     }
// })

module.exports = router