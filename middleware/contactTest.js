const userBL = require("../BL/userBL")
const productBL = require("../BL/productBL")
const asynchandler = require('express-async-handler')

//בודק אם יש קשר בין המוצר למשתמש
const isRelationshipBetweenProductAndUser = asynchandler(async (req, res, next) => {
    const { email,idProduct } = req
    const user = await userBL.getDetailsAboutUserByEmail(email)
    if(!user) throw new Error("User does not exist")
    console.log(user);
    console.log(idProduct);
    next()
})

module.exports = { isRelationshipBetweenProductAndUser }