const  userBl = require("../BL/userBL")


async function isAdmin(req,res,next){
    try {
        const {email}=req
        const user=await userBl.getDetailsAboutUserByEmail(email)
        if(!user) throw "This user is not exsit"
        if(!user.isAdmin) throw "Not authorized"
        next()
    } catch (error) {
        res.status(400).send({ error: error.message ?? error })
    }
}
module.exports={isAdmin}