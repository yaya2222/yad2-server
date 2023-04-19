const globalBL = require("../BL/globalBL");
const asynchandler = require('express-async-handler')
const express = require("express");
const { validToken } = require("../middleware/auth");
const router = express.Router();

router.post("/add/product", validToken,asynchandler(async (req, res) => {
  const products = await globalBL.addProduct(req.user,req.body)
  res.send(products);
}));

router.delete("/users",validToken,asynchandler(async(req,res)=>{
  const delUser=await globalBL.deleteUser(req.user)
  res.send(delUser)
}))



module.exports = router;
