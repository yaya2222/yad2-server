const mongoose=require("mongoose")

mongoose.set('strictQuery', false);

const connect =async () =>{
    try {
        await mongoose.connect(process.env.MOGO_CODE)
        console.log("we are connected to mongo...");
    } catch (error) {
        console.log('====================================');
        console.log(error.message || error);
        console.log('====================================');
    }
    }
    
    module.exports=connect