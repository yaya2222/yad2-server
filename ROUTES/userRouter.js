const userBL = require("../BL/userBL");
const express = require("express");
const { validToken } = require("../middleware/auth");
const { isAdmin } = require("../middleware/admin");
const router = express.Router();
const asynchandler = require("express-async-handler");

/**
 * @description Registration of a new user
 * @route POST /users/register
 * @access Public
 * @param {Object} req.body - User registration details
 * @param {string} req.body.name - Name of user
 * @param {string} req.body.email - Email of user
 * @param {string} req.body.password - Password of user
 * @param {string} req.body.tel - Tel of user
 * @returns {object} The information of the newly created user
 */
router.post(
  "/register",
  asynchandler(async (req, res) => {
    const newUser = await userBL.register(req.body);
    res.send(newUser);
  })
);

/**
 * @description Login user
 * @route POST /users/login
 * @access Public
 * @param {Object} req.body - Email and password of the user
 * @param {string} req.body.email - Email of user
 * @param {string} req.body.password - Password of user
 * @returns {string} Token
 */
router.post(
  "/login",
  asynchandler(async (req, res) => {
    const token = await userBL.login(req.body);
    res.send(token);
  })
);

router.get(
  "/details",
  validToken,
  asynchandler(async (req, res) => {
    res.send(req.user);
  })
);

/**
 * @description Get information about all users
 * @route GET /users/all/Users
 * @access Private/admin
 * @param {Object} req.body - User filtering
 * @returns {Array} All users
 */
router.get(
  "/all/users",
  validToken,
  isAdmin,
  asynchandler(async (req, res) => {
    const filter = req.body
    const allUsers = await userBL.readAll(filter);
    res.send(allUsers);
  })
);

/**
 * @description Changing user details
 * @route PUT /users/
 * @access Private/user
 * @param {Object} req.body - The new user information
 * @returns {Object} User information after the change
*/
router.put(
  "/",
  validToken,
  asynchandler(async (req, res) => {
    const updateUser = await userBL.upDateUserByEmail(req.user, req.body);
    res.send(updateUser);
  })
  );
  
  /**
   * @description Change user permission
   * @route PUT /users/permission
   * @access Private/admin
   * @param {Object} req.body - Email and permission
   * @param {string} req.body.email - Email of user
   * @param {boolean} req.body.isAdmin - Permission of user
   * @returns {Object} User information after the change
  */
 router.put(
   "/permission",
   validToken,
   isAdmin,
  asynchandler(async (req, res) => {
    const updateUser = await userBL.upDateUserForAdmin(req.body);
    res.send(updateUser);
  })
);

/**
 * @description Get all products of the user
 * @route GET /users/all/products
 * @access Public
 * @param {object} req.body - email of user
 * @param {string} req.body.email - email of user
 * @returns {Array} All products of the user
 */
router.get(
  "/all/products",
  asynchandler(async (req, res) => {
    const allProducts = await userBL.getDetailsAboutUserByEmail(
      req.body.email,
      true
    );
    res.send(allProducts);
  })
);

module.exports = router;
