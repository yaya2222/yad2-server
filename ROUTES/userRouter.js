const userBL = require("../BL/userBL");
const express = require("express");
const { validToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");
const router = express.Router();
const asynchandler = require('express-async-handler')



router.post("/register", asynchandler (async (req, res) => {
    // try {
        const newProduct = await userBL.register(req.body)
        res.send(newProduct)
    // } catch (error) {
    //     res.status(400).send({ errordsa: error.message ?? error })
    // }
}))

router.post("/login",asynchandler ( async (req, res) => {
    // try {
        const token = await userBL.login(req.body)
        res.send(token)
    // } catch (error) {
    //     res.status(400).send({ error: error.message ?? error })
    // }
}))

router.get("/details", validToken, asynchandler (async (req, res) => {
    // try {
        const detailsUser = await userBL.getDetailsAboutUserByEmail(req.email)
        res.send(detailsUser)
    // } catch (error) {
    //     res.status(400).send({ error: error.message ?? error })
    // }
}))

router.get("/all", validToken,isAdmin,asynchandler ( async (req, res) => {
    // try {
        const allUsers = await userBL.readAll(req.body.filter)
        res.send(allUsers)
    // } catch (error) {
    //     res.status(400).send({ error: error.message ?? error })
    // }
}))

module.exports = router;
