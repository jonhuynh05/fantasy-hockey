const express = require("express")
const router = express.Router()
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")

router.get("/", async(req, res) => {
    try{
        console.log("hits the back")
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router