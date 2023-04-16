const  userBL = require("../BL/userBL")
const jwt = require("jsonwebtoken")
const asynchandler = require('express-async-handler')
const secret = process.env.SECRET

// const createToken=(email)=> {
//     return jwt.sign({ email }, secret, { expiresIn: "1h" })
// }

const validToken=asynchandler(async (req, res, next)=> {
        let token = req.headers.authorization
        if(!token) throw new Error("Missing data")
        token=token.split(" ")[1]
        const {email} = jwt.verify(token, secret)
        const user= await userBL.getDetailsAboutUserByEmail(email)
        req.user=user
        next()
})

module.exports = { validToken }
