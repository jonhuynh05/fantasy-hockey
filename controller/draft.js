const express = require("express")
const router = express.Router()
const Draft = require("../models/Draft")
const DraftYear = require("../models/DraftYear")

router.get("/", async (req, res) => {
    try{
        const allYears = await DraftYear.find({})
        const yearList = []
        for (let i = 0; i < allYears.length; i++){
            yearList.push(allYears[i].year)
        }
        res.json(yearList)
    }
    catch(err){
        console.log(err)
    }
})


router.post("/new", async (req, res) => {
    try{
        const draftDbEntry = {}
        draftDbEntry.round = req.body.round
        draftDbEntry.pick = req.body.pick
        draftDbEntry.team = req.body.team
        draftDbEntry.selection = req.body.selection
        const foundYear = await DraftYear.findOne({year: req.body.year})
        if(foundYear){
            await Draft.create(draftDbEntry, (err, createdDraft) => {
                if(err){
                    console.log(err)
                }
                else{
                    foundYear.details.push(createdDraft)
                    foundYear.save((err, data) => {
                        res.json({
                            message: `Draft selection added.`
                        })
                    })
                }
            })
        }
        else{
            const yearDbEntry = {}
            yearDbEntry.year = req.body.year
            const newYear = await DraftYear.create(yearDbEntry)
            await Draft.create(draftDbEntry, (err, createdDraft) => {
                if(err){
                    console.log(err)
                }
                else{
                    newYear.details.push(createdDraft)
                    console.log(newYear, "NEW")
                    newYear.save((err, data) => {
                        res.json({
                            message: `Draft selection added.`
                        })
                    })
                }
            })
        }
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