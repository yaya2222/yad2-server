const globalBL = require("../BL/globalBL");
const asynchandler = require('express-async-handler')
const express = require("express");
const { validToken } = require("../middleware/auth");
const router = express.Router();

router.post("/addproduct", validToken,asynchandler(async (req, res) => {
  const products = await globalBL.addProduct(req.user,req.body)
  res.send(products);
}));



module.exports = router;
