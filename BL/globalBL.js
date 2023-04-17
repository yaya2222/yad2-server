const userBL = require("../BL/userBL");
// const productBL=require("../BL/productBL")
const productController = require("../DL/controllers/productController");
const userController = require("../DL/controllers/userController");

async function addProduct(user, product) {
  product.idUser = user._id;
  const newProduct = await productController.create(product);
  if (!newProduct) throw new Error("Product creation failed");
  const upDateUser = await userController.updateByid(user.id, {
    idProducts: [...user.idProducts, newProduct._id],
  });
  if (!upDateUser) throw new Error("Failed to add the product to the user");
  return {
    newProduct,
    upDateUser,
  };
}
// async function addProduct(user,product){
//     const newProduct=await productBL.create(user._id,product)
//     const upDateUser=await userBL.upDateUserByEmail(user,{idProducts:[...user.idProducts,newProduct._id]})
//     return {
//         newProduct,
//         upDateUser
//     }
// }

async function deleteUser(user) {
  const deleteUser = await userController.del(user.id);
  if (!deleteUser) throw new Error("Failed to delete user");
  const deleteProducts = await productController.delMany(user._id);
  if (!deleteProducts) throw new Error("Failed to delete user's products");
  return {
    deleteUser,
    deleteProducts,
  };
}

module.exports = { addProduct, deleteUser };
