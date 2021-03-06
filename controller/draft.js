const express = require("express")
const router = express.Router()
const Draft = require("../models/Draft")
const DraftYear = require("../models/DraftYear")


router.get("/", async (req, res) => {
    try{
        const allYears = await DraftYear.find({})
        const yearList = []
        allYears.forEach((year) => {
            let object = year.toObject()
            object.option = {
                "value": year.year,
                "key": year.year,
                "text": year.year
            }
            yearList.push(object)
        })
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
            allDetails.push(foundDetails)
        }
        function compare(a, b){
            if(Number(a.pick) < Number(b.pick)){
                return -1
            }
            if(Number(a.pick) > Number(b.pick)){
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

router.delete("/:year/remove", async (req, res) => {
    try{
        const foundDraftYear = await DraftYear.findOne({year: req.params.year})
        for (let i = 0; i < req.body.length; i++){
            await Draft.findByIdAndDelete(foundDraftYear.details[i])
        }
        await DraftYear.findOneAndDelete({year: req.params.year})
        res.json({
            message: "Removed."
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router