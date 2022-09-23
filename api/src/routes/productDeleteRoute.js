const express = require("express");
const router = express.Router();
const { Product } = require("../db");
const Sequelize = require("sequelize");

/* let pokesDeleted = [] */

router.delete("/", async (req, res, next) => {
  const Op = Sequelize.Op;
  try {
    const { id } = req.body;
    console.log("req.body",req.body);
    if (id) {
      const product = await Product.findOne({
        where: { id: { [Op.in]: id } },
      });
      console.log("product:", product);
      await Product.destroy({
        where: {
          id: { [Op.in]: id },
        },
      });

      return res.status(204).json(product);
    }
    return res.status(400).send("invalid id");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
