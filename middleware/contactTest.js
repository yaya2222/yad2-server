const userBL = require("../BL/userBL")
const productBL = require("../BL/productBL")
const asynchandler = require('express-async-handler')

//בודק אם יש קשר בין המוצר למשתמש
const isRelationshipBetweenProductAndUser = asynchandler(async (req, res, next) => {
    const { email } = req
    const user = await userBL.getDetailsAboutUserByEmail(email)
    console.log(user);
    next()
})

module.exports = { isRelationshipBetweenProductAndUser }