const express = require("express");
const router = express.Router();
const { Product } = require("../db");

/* let pokesDeleted = [] */

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if(id){
        const product = await Product.findOne({
            where: { id: id },
          });
          console.log("id:", id);
          console.log("product:",product)
          await Product.destroy({
            where: { id: id },
          });
      
          return res.status(204).json(product);
    }
    return res.status(400).send("invalid id")
  } catch (e) {
    next(e);
  }
});

module.exports = router;
