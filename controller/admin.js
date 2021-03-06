const express = require("express")
const router = express.Router()
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")

router.get("/adminList", async(req, res) => {
    try{
        const allAdmin = await Admin.find({})
        const adminList = []
        for (let i = 0; i < allAdmin.length; i++){
            if(allAdmin[i].username === "thecommissioner"){
                null
            }
            else{
                adminList.push({username: allAdmin[i].username})
            }
        }
        res.json({
            adminList: adminList
        })
    }
    catch(err){
        console.log(err)
    }
})

router.get("/logout", async (req, res) => {
    try{
        req.session.destroy()
        res.json("Logged out.")
    }
    catch(err){
        console.log(err)
    }
})

router.put("/edit", async(req, res) => {
    try{
        const foundAdmin = await Admin.findOne({
            username: req.session.username
        })
        if (foundAdmin){
            if(bcrypt.compareSync(req.body.confirmPassword, foundAdmin.password)){
                const updatedAdmin = {}
                updatedAdmin.username = req.session.username
                const password = req.body.updatePassword
                const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                updatedAdmin.password = passwordHash
                await Admin.findOneAndUpdate({username: req.session.username}, updatedAdmin, {new: true})
                res.json({
                    message: "Admin updated."
                })
            }
            else{
                res.json({
                    message: "Password incorrect."
                })
            }
        }
        else{
            res.json({
                message: "User not found."
            })
        }
    }
    catch(err){
        console.log(err)
    }
})

router.post("/login", async(req, res) => {
    try{
        const foundAdmin = await Admin.findOne({
            username: req.body.username
        })
        if (foundAdmin) {
            if(bcrypt.compareSync(req.body.password, foundAdmin.password)){
                req.session.username = foundAdmin.username
                if(req.session.username === "thecommissioner"){
                    const allAdmin = await Admin.find({})
                    const adminList = []
                    for (let i = 0; i < allAdmin.length; i++){
                        if(allAdmin[i].username === "thecommissioner"){
                            null
                        }
                        else{
                            adminList.push({username: allAdmin[i].username})
                        }
                    }
                    res.json({
                        message: "Log in successful.",
                        master: true,
                        adminList: adminList

                    })
                }
                else{
                    res.json({
                        message: "Log in successful."
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

router.delete("/remove", async (req, res) => {
    try{
        await Admin.findOneAndDelete({username: req.body.username})
        console.log(req.body.username)
        res.json({
            message: "Removed."
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router