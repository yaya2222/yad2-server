const asynchandler = require('express-async-handler')


const isAdmin=asynchandler((req,res,next)=>{
        const {user}=req
        if(!user.isAdmin) throw new Error("Not authorized")
        next()
})
module.exports={isAdmin}