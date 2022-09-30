const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { Product } = require("./src/db.js");
/* const {apiTypesToDb} = require('./src/routes/controllers/types') */
const json = require("./src/Helper/products.json");
const products = json.data;

// Syncing all the models at once.
db.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log("%s listening at 3001");

    for (let i = 0; i < products.length; i++) {
      await Product.findOrCreate({
        where: {
          name: products[i].name,
          price: products[i].price,
          description: products[i].description,
          cost: products[i].cost,
          image: products[i].image,
          code: products[i].code,
          type: products[i].type,
          deleted: products[i].deleted || false,
        },
      });
    }
    const productos = await Product.findAll();
    console.log("productos.length :", productos.length);
  });
});
