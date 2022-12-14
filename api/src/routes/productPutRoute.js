const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { Product } = require("../db");
const { prodFilterPaginate } = require("../controllers/products");

/* router.put("/filter", async (req, res, next) => {
  try {
    const { page = 0, size = 6 } = req.query;

    const options = {
      limit: size,
      offset: size * page,
    };
    
    if (Object.entries({ ...req.body }).length !== 0)
      options.where = { ...req.body };

    try {
      const { count, rows } = await Product.findAndCountAll(options);
      if (rows.length === 0) return res.status(404).send("pets not found");
    
      if (req.query.hasOwnProperty("a_z"))
        req.query.a_z === "true" ? rows.sort(sortAsc) : rows.sort(sortDes);
      res.json({ total: count, pets: rows });
    } catch (e) {
      if (e.message.includes("no existe la columna"))
        return res
          .status(404)
          .send("error, the name of the properties are mistyped");
      res.status(404).send("the search returned no results");
    }
  } catch (e) {
    console.log(e);
  }
}); */

router.put("/logicdelete", async (req, res, next) => {
  const Op = Sequelize.Op;
  try {
    const { id } = req.body;
    const {action} = req.query
    if(id){
    console.log('Soy id:', id);
    const productsBorrados = await Product.findAll(
      {where: {
        id: { [Op.in]: id },
      }}
    )
    const deleted = await Product.update(action === 'delete' ? {deleted : 'true'} : action === 'undelete' && {deleted : 'false'},{
      where: {
        id: { [Op.in]: id },
      },
    });
    console.log('deleted', deleted)
    console.log('productsBorrados', productsBorrados)
    return res.status(200).send("products deleted succesfully");
    }
    res.status(400).send('id is required')
  } catch (e) {
    console.log(e)
  }
});

router.put("/updateproduct", async (req, res, next) => {
  try{
    const { name, price, description, cost, image, code, type, id } = req.body
    console.log("req.body:",req.body)
    const udatedProduct = await Product.update({ name, price, description, cost, image, code, type }, {
      where: {
        id
      }
    })
    console.log("udatedProduct", udatedProduct)
    return res.status(200).send(udatedProduct);
  }catch(e){
    next(e)
  }
})


module.exports = router;
