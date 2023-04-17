const productBL = require("../BL/productBL");
const express = require("express");
const router = express.Router();
const asynchandler = require('express-async-handler');
const { validToken } = require("../middleware/auth");
const {isRelationshipBetweenProductAndUser} = require("../middleware/contactTest")

router.get("/", asynchandler(async (req, res) => {
  const filter = req.body
  const products = await productBL.readAll(filter);
  res.send(products);
}));

router.get("/:id", asynchandler(async (req, res) => {
  const { id } = req.params
  const products = await productBL.readOneById(id);
  res.send(products);
}));


router.put("/:id",validToken,isRelationshipBetweenProductAndUser, asynchandler(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const updatedProduct = await productBL.update(id, data)
  res.send(updatedProduct)
}))

router.delete("/:id",validToken,isRelationshipBetweenProductAndUser,asynchandler (async (req, res) => {
    const { id } = req.params
    const deleteProduct = await productBL.del(id)
    res.send(deleteProduct)
}))


module.exports = router;
