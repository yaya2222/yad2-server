
const UserModel = require("../models/UserModel");

function readAll(filter = {}) {
  return UserModel.find(filter)
}

function readOneByEmail(email) {
    return UserModel.findOne({ email })
}

function create(newUser) {
    return UserModel.create(newUser);
}

function updateByid(id, newData) {
    return UserModel.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
}




module.exports = { create, readOneByEmail, updateByid,readAll }
