require('dotenv').config()
require("./db")()
const express = require("express"),
app=express(),
PORT=process.env.PORT||3001;

const productRouter=require("./ROUTES/productRouter")
const userRouter=require("./ROUTES/userRouter");
const  {errorHandler} = require('./middleware/error');

app.use(express.json())

app.use("/products",productRouter)
app.use("/uesrs",userRouter)

app.use(errorHandler)

app.listen(PORT,()=>console.log(`server is runnig in PORT:${PORT}`))

