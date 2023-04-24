const productBL = require("../BL/productBL");
const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const { validToken } = require("../middleware/auth");
const {
  isRelationshipBetweenProductAndUser,
} = require("../middleware/contactTest");

/**
 * @description Get all products
 * @route GET /products/
 * @access Public
 * @param {Object} req.body - Product filtering
 * @returns {Array} All products
 */
router.get(
  "/",
  asynchandler(async (req, res) => {
    const filter = req.body;
    const products = await productBL.readAll(filter);
    res.send(products);
  })
);

/**
 * @description Get product by id
 * @route GET /products/:id
 * @access Public
 * @param {object} req.params - params
 * @param {string} req.params.id - Id of product
 * @returns {Object} Product
 */
router.get(
  "/:id",
  asynchandler(async (req, res) => {
    const { id } = req.params;
    const products = await productBL.readOneById(id);
    res.send(products);
  })
);

/**
 * @description Change product details by id
 * @route PUT /products/:id
 * @access Private/user
 * @param {object} req.params - params
 * @param {string} req.param.id - Id of product
 * @param {Object} req.body - New product details
 * @returns {Object} Product details after the change
 */
router.put(
  "/:id",
  validToken,
  isRelationshipBetweenProductAndUser,
  asynchandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updatedProduct = await productBL.update(id, data);
    res.send(updatedProduct);
  })
);

/**
 * @description Product deletion
 * @route DELETE /products/:id
 * @access Private/user
 * @param {object} req.params - params
 * @param {string} req.params.id - Id of product
 * @returns {Object} Deleted product details
 */
router.delete(
  "/:id",
  validToken,
  isRelationshipBetweenProductAndUser,
  asynchandler(async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await productBL.del(id);
    res.send(deleteProduct);
  })
);

module.exports = router;
