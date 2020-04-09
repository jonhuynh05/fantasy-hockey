const express = require("express")
const router = express.Router()
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")

router.post("/login", async(req, res) => {
    try{
        const foundAdmin = await Admin.findOne({
            username: req.body.username
        })
        if (foundAdmin) {
            if(bcrypt.compareSync(req.body.password, foundAdmin.password)){
                req.session.username = foundAdmin.username
                if(req.session.username === "thecommissioner"){
                    console.log(Admin, "ADMINS")
                    res.json({
                        message: "Log in successful.",
                        master: true
                    })
                }
                else{
                    const allAdmin = await Admin.find({})
                    const adminList = []
                    for (let i = 0; i < allAdmin.length; i++){
                        adminList.push(allAdmin[i].username)
                    }
                    console.log(adminList)
                    res.json({
                        message: "Log in successful.",
                        adminList: adminList
                    })
                }
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

router.post("/register", async(req, res) => {
    try{
        const foundAdmin = await Admin.findOne({
            username: req.body.newAdminUsername
        })
        if(foundAdmin){
            res.json({
                message: "Username already exists."
            })
        }
        else {
            const adminDbEntry = {}
            const password = req.body.newAdminPassword
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            adminDbEntry.username = req.body.newAdminUsername
            adminDbEntry.password = hashPassword
            const newAdmin = await Admin.create(adminDbEntry)
            res.json({
                message: "Admin created."
            })
        }
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router