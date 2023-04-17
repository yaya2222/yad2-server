const productController = require("../DL/controllers/productController")


async function readAll(filter) {
    const products = await productController.readAll(filter)
    if (products.length == 0) throw new Error('There are no products')
    return products
}
async function readOneById(id) {
    const product = await productController.readOneById(id)
    if (!product) throw  new Error(`This id: ${id} is not exsit`)
    return product
}

// async function create(idUser,product){
//     product.idUser=idUser
//     const newProduct = await productController.create(product)
//     if (!newProduct) throw new Error('Creation failed')
//     return newProduct
// }

async function update(id, newData) {
    if (!(await productController.readOneById(id))) throw new Error(`This id: ${id} is not exsit`)
    const updatedProduct = productController.update(id, newData)
    if (!updatedProduct) throw new Error("Failed to update data")
    return updatedProduct
}


async function del(id){
    if (!(await productController.readOneById(id))) throw new Error(`This id: ${id} is not exsit`)
    const deleteProduct=productController.del(id)
    if (!deleteProduct) throw new Error("Failed to delete data")
    return deleteProduct
}

module.exports = { readAll, readOneById, update,del }