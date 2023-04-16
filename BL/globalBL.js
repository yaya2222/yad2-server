const userBL=require("../BL/userBL")
const productBL=require("../BL/productBL")


async function addProduct({email,product}){
    const user = await userBL.getDetailsAboutUserByEmail(email)
    const product=await productBL.create(product)

}

module.exports={addProduct}