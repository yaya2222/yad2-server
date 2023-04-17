const asynchandler = require("express-async-handler");

//בודק אם יש קשר בין המוצר למשתמש
const isRelationshipBetweenProductAndUser = asynchandler(
  async (req, res, next) => {
    const { user } = req;
    const idProduct = req.params.id;
    const isProductBelongToTheUser = user.idProducts.some(
      (id) => id.toString() === idProduct
    );
    if (!isProductBelongToTheUser)
      throw "The product does not belong to the user";
    next();
  }
);

module.exports = { isRelationshipBetweenProductAndUser };
