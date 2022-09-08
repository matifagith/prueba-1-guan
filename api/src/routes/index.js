const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const productGet = require('./productGetRoute');
const productPost = require('./productPostRoute');
const productPut = require('./productPutRoute');
const productdelete = require('./productDeleteRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req,res,send)=>{
    res.send('bienvenudo al server, las rutas disponibles son: /productget, /productpost, /productput, /productdelete')
})

router.use('/productget', productGet);
router.use('/productpost', productPost)
router.use('/productput', productPut); 
router.use('/productdelete', productdelete); 


module.exports = router;
