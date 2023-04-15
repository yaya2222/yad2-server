
const userController = require("../DL/controllers/userController")
const bcryptjs = require("bcryptjs");
const { createToken } = require("../middleware/auth");

async function register({ name, email, password, tel,isAdmin }) {
    if (!name || !email || !password||!tel) throw new Error(`Missing data`)
    const salt = bcryptjs.genSaltSync(10)
    password = bcryptjs.hashSync(password+process.env.PASSWORD, salt);
    const newUser = await userController.create({ name, email, password, tel,isAdmin })
    if (!newUser) throw new Error('Creation failed')
    const token=createToken(newUser.email)
    return token
}

async function login({ email, password } ){
    if(!email||!password) throw new Error( "Missing data")
    const user=await userController.readOneByEmail(email).select("+password")
    if(!user||!bcryptjs.compareSync(password+process.env.PASSWORD,user.password)) throw new Error('Email or password invalid')
    // if(!bcryptjs.compareSync(password+process.env.PASSWORD,user.password)) throw 'email or password invalid'
    const updateUser= await userController.updateByid(user._id,{lastConnection:new Date()})
    const token=createToken(user.email)
    return token
}

async function getDetailsAboutUserByEmail(email){
const user = await userController.readOneByEmail(email)
if(!user) throw new Error("This email is not exsit")
return user
}

async function readAll(filter){
const allUsers=await userController.readAll(filter).select("+lastConnection +firstConnection")
if (allUsers.length==0) throw new Error("Not found users")
return allUsers
}

module.exports = { register,login,getDetailsAboutUserByEmail,readAll }