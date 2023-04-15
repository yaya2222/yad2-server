const productBL = require("../BL/productBL");
const express = require("express");
const router = express.Router();
const asynchandler = require('express-async-handler')

router.get("/", asynchandler(async (req, res) => {
  // try {
  const filter = req.body
  const products = await productBL.readAll(filter);
  res.send(products);
  // } catch (error) {
  //   res.status(400).send({ error: error.message ?? error })
  // }
}));

router.get("/:id", asynchandler(async (req, res) => {
  // try {

  const { id } = req.params
  const products = await productBL.readOneById(id);
  res.send(products);
  // } catch (error) {
  //   res.status(400).send({ error: error.message ?? error })
  // }
}));

router.post("/", asynchandler(async (req, res) => {
  // try {
  const newProduct = await productBL.create(req.body)
  res.send(newProduct)
  // } catch (error) {
  //   res.status(400).send({ error: error.message ?? error })

  // }
}))

router.put("/:id", asynchandler(async (req, res) => {
  // try {
  const { id } = req.params
  const data = req.body
  const updatedProduct = await productBL.update(id, data)
  res.send(updatedProduct)
  // } catch (error) {
  //   res.status(400).send({ error: error.message ?? error })
  // }
}))

router.delete("/:id", asynchandler (async (req, res) => {
  // try {
    const { id } = req.params
    const deleteProduct = await productBL.del(id)
    res.send(deleteProduct)
  // } catch (error) {
  //   res.status(400).send({ error: error.message ?? error })
  // }
}))


module.exports = router;
