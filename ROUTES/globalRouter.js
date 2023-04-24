const globalBL = require("../BL/globalBL");
const asynchandler = require('express-async-handler')
const express = require("express");
const { validToken } = require("../middleware/auth");
const router = express.Router();

/**
 * @description Add a product to the user
 * @route POST /add/product
 * @access Private/user
 * @param {Object} req.body - New product details
 * @returns {object} The new product user details
 */
router.post("/add/product", validToken,asynchandler(async (req, res) => {
  const products = await globalBL.addProduct(req.user,req.body)
  res.send(products);
}));

/**
 * @description Delete user
 * @route DELETE /users
 * @access Private/user
 * @returns {object} Deleted user information
 */
router.delete("/users",validToken,asynchandler(async(req,res)=>{
  const delUser=await globalBL.deleteUser(req.user)
  res.send(delUser)
}))



module.exports = router;
