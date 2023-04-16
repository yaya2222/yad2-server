const userBL=require("../BL/userBL")
const productBL=require("../BL/productBL")


async function addProduct({email,product}){
    const user = await userBL.getDetailsAboutUserByEmail(email)
    

}

module.exports={addProduct}