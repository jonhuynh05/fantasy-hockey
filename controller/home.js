const express = require("express")
const router = express.Router()
const Home = require("../models/Home")

router.get("/", async (req, res) => {
    try{
        const foundImage = await Home.find({})
        res.json(foundImage[0].imgURL)
    }
    catch(err){
        console.log(err)
    }
})

router.post("/new", async (req, res) => {
    try{
        await Home.findOneAndDelete({imgURL: req.body.imgURL})
        const imgEntry = {}
        imgEntry.imgURL = req.body.imgUpload
        const newImage = await Home.create(imgEntry)
        res.json({
            message: `New image added.`
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router