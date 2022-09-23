const server = require('./src/app.js');
const {db} = require ('./src/db.js')
const { Product } = require('./src/db.js');
/* const {apiTypesToDb} = require('./src/routes/controllers/types') */
const json = require ('./src/Helper/products.json')
const products = json.data

// Syncing all the models at once.
db.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, async () => { 
    console.log('%s listening at 3001'); 
    await Product.bulkCreate(products)
  });
});
