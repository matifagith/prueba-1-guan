const express = require('express')
const router = express.Router()
const {Product, Type} = require('../db');

router.get('/', async (req, res, next)=>{
    try{
        const allTypes = []        
        const productTypes = await Product.findAll();
        const types = productTypes.forEach(e => allTypes.push(e.type))
        const allTypes2 = [... new Set(allTypes)]
        res.status(200).send(allTypes2)
    }catch(e){
        next(e)
    }
})


module.exports = router;