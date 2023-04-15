const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const asynchandler = require('express-async-handler')

const createToken=(email)=> {
    return jwt.sign({ email }, secret, { expiresIn: 100 })
}

const validToken=asynchandler((req, res, next)=> {
    // try {
        let token = req.headers.authorization
        if(!token) throw "Missing data"
        token=token.split(" ")[1]
        const {email} = jwt.verify(token, secret)
        if(!email) throw "Invalid token"
        req.email=email
        next()
    // } catch (error) {
    //     res.status(400).send({ error: error.message ?? error })
    // }

})

module.exports = { createToken,validToken }


