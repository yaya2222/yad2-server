
const ProductModel = require("../models/ProductModel");

async function readAll(filter = {}) {
  return ProductModel.find(filter)
    // return ProductModel.find({price:{$gt:1000}})
    // .limit(1).skip(1)
    ;
}

function readOneById(id) {
  return ProductModel.findById(id)
}

function create(newProduct) {
  return ProductModel.create(newProduct);
}

function update(id, newData) {
  return ProductModel.findByIdAndUpdate(id, newData, { new: true })
}

function del(id){
return ProductModel.findByIdAndUpdate(id,{isActive:false},{ new: true })
}

function delMany(idUser){
return ProductModel.updateMany({idUser},{isActive:false},{new:true})
}

module.exports = { readAll, create, readOneById, update,del,delMany }
