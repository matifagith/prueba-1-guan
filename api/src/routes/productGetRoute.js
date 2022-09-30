const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getDbProductByName,
} = require("../controllers/products");
const { Product, Type } = require("../db");

/*  router.get('/', async (req, res, next)=>{
try{
    return res.send('bienvenido al server')
}
catch(e){
console.log(e)
}
 }) */

router.get("/", async (req, res, next) => {
  try {
    const { name, deleted } = req.query;
    console.log(deleted);

    if (name) {
      console.log(`getDbProductByName(name: ${name})`);
      const productsByName = await getDbProductByName(name, deleted);
      console.log(productsByName);
      res.status(200).json(productsByName);
    } else {
      console.log("getAllProducts()");
      const products = await getAllProducts(deleted);

      res.status(200).json(products);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/types", async (req, res, next) => {
  try {
    const {deleted}=req.query
    const products = await Product.findAll({where:{deleted:deleted}});
    const result = products.map((e) => e.type);
    const types = new Set(result);
    const arrTypes = [...types]
    if(arrTypes.length > 0){
      return res.status(200).send(arrTypes);
    }
    /* console.log("arrTypes:", arrTypes); */
    return res.status(400).send('No hay categorias, agregue productos al inventario');
  } catch (e) {
    next(e);
  }
});

router.get("/filtered", async (req, res, next) => {
  try {
    const {type, deleted} = req.query
    const products =type === 'default' ? await Product.findAll({where:{deleted:deleted}}) : await Product.findAll({where:{type:type, deleted:deleted}});
    if(products.length > 0){
      return res.status(200).send(products);
    }
    /* console.log("arrTypes:", arrTypes); */
    return res.status(400).send('No hay productos con esa categoria');
  } catch (e) {
    next(e);
  }
});

/* router.get('/dbpokemons', async (req, res, next)=>{
    try{
        const allDbPokes = await getAllDbPokes()
        res.status(200).json(allDbPokes)
    }catch(e){
        next(e)
    }
}) */

/* router.get('/:id', async (req, res, next)=>{
    try{
        const {id} = req.params
        if(id){
            console.log(` getPokeById(id: ${id})`)
            const poke = await getPokeById(id)
            if(poke === 'PDNE'){
                res.status(404).send('PDNE')
            }
            res.status(200).json(poke)
        }

    }catch(e){
        next(e)
    }
}) */

module.exports = router;
