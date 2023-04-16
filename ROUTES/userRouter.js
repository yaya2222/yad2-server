const userBL = require("../BL/userBL");
const express = require("express");
const { validToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");
const router = express.Router();
const asynchandler = require('express-async-handler')


router.post("/register", asynchandler (async (req, res) => {
        const newProduct = await userBL.register(req.body)
        res.send(newProduct)
}))

router.post("/login",asynchandler ( async (req, res) => {
        const token = await userBL.login(req.body)
        res.send(token)
}))

router.get("/details", validToken, asynchandler (async (req, res) => {
        res.send(req.user)
}))

router.get("/all", validToken,isAdmin,asynchandler ( async (req, res) => {
        const allUsers = await userBL.readAll(req.body.filter)
        res.send(allUsers)
}))

router.put("/",validToken,asynchandler(async (req,res)=>{
    const updateUser=await userBL.upDateUserByEmail(req.user,req.body)
    res.send(updateUser)
}))

router.put("/permission",validToken,isAdmin,asynchandler(async (req,res)=>{
    const updateUser=await userBL.upDateUserForAdmin(req.body)
    res.send(updateUser)
}))

module.exports = router;
