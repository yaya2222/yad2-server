const productBL = require("../BL/productBL");
const express = require("express");
const router = express.Router();
const asynchandler = require('express-async-handler')

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

router.post("/", asynchandler(async (req, res) => {
  const newProduct = await productBL.create(req.body)
  res.send(newProduct)
}))

router.put("/:id", asynchandler(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const updatedProduct = await productBL.update(id, data)
  res.send(updatedProduct)
}))

router.delete("/:id", asynchandler (async (req, res) => {
    const { id } = req.params
    const deleteProduct = await productBL.del(id)
    res.send(deleteProduct)
}))


module.exports = router;
