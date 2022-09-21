const express = require('express')
const router = express.Router()
const {Product, Type} = require('../db')

router.post('/',async (req, res, next)=>{
    try{
        const{
            name,
            price,
            description,
            cost,
            image,
            code,
            type
        } = req.body

        console.log(req.body)
    if(!name || !price || !cost || !code){
        return res.status(400).send('faltan name or price or cost or code')
    }

    
    const productCreated = await Product.create({
        name,
        price,
        description,
        cost,
        image,
        code,
        type
    })

    return res.status(201).send(productCreated)

    }catch(e){
        next(e)
    }
})

module.exports = router;

