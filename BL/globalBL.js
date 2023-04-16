const userBL=require("../BL/userBL")
const productBL=require("../BL/productBL")


async function addProduct(user,product){
    const newProduct=await productBL.create(user._id,product)
    const upDateUser=await userBL.upDateUserByEmail(user,{idProducts:[...user.idProducts,newProduct._id]})
    return {
        newProduct,
        upDateUser
    }
}

module.exports={addProduct}