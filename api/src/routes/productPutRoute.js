const express = require("express");
const router = express.Router();
const { Product } = require("../db");
const { prodFilterPaginate } = require("../controllers/products");

/* let pokesDeleted = [] */

router.put("/filter", async (req, res, next) => {
  try {
    const { page = 0, size = 6 } = req.query;

    const options = {
      limit: size,
      offset: size * page,
    };
    /* req.body.stateBinary = true; */
    if (Object.entries({ ...req.body }).length !== 0)
      options.where = { ...req.body };

    try {
      const { count, rows } = await Product.findAndCountAll(options);
      if (rows.length === 0) return res.status(404).send("pets not found");
      // eslint-disable-next-line no-prototype-builtins
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
});

module.exports = router;
