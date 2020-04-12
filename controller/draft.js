const express = require("express")
const router = express.Router()
const Draft = require("../models/Draft")
const DraftYear = require("../models/DraftYear")


router.get("/", async (req, res) => {
    try{
        const allYears = await DraftYear.find({})
        const yearList = []
        for (let i = 0; i < allYears.length; i++){
            yearList.push(allYears[i])
        }
        function compare(a, b){
            if(a.year < b.year){
                return -1
            }
            if(a.year > b.year){
                return 1
            }
            return 0
        }
        yearList.sort(compare)
        res.json(yearList)
    }
    catch(err){
        console.log(err)
    }
})

router.get("/:year", async(req, res) => {
    try{
        req.session.year = req.params.year
        const year = await DraftYear.findOne({year: req.params.year})
        const allDetails = []
        for (let i = 0; i < year.details.length; i++){
            const foundDetails = await Draft.findById(year.details[i])
            console.log(foundDetails, "FOUND")
            allDetails.push(foundDetails)
        }
        console.log(allDetails)
        function compare(a, b){
            if(a.pick < b.pick){
                return -1
            }
            if(a.pick > b.pick){
                return 1
            }
            return 0
        }
        allDetails.sort(compare)
        res.json(allDetails)

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

router.delete("/remove", async (req, res) => {
    try{
        console.log(req.body, "BODY")
        const foundYear = await DraftYear.findOne({year: req.session.year})
        console.log(foundYear, "YEAR")
        const foundDetails = await Draft.findById(req.body._id)
        foundYear.details.remove(foundDetails._id)
        await foundYear.save()
        const deleteDetails = await Draft.findByIdAndDelete(req.body._id)
        res.json({
            message: "Removed."
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router