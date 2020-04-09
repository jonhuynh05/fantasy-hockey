const express = require("express")
const router = express.Router()
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")

//Login
router.post("/", async(req, res) => {
    try{
        console.log(req.body, "hits the back")
        const foundAdmin = await Admin.findOne({
            username: req.body.username
        })
        if (foundAdmin) {
            if(bcrypt.compareSync(req.body.password, foundAdmin.password)){
                req.session.username = foundAdmin.username
                res.json({
                    message: "Log in successful."
                })
            }
            else{
                res.json({
                    message: "Password is incorrect."
                })
            }
        }
        else{
            res.json({
                message: "Username not found."
            })
        }
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router