const axios = require('axios');
const {Product, Type} = require('../db');
/* require('dotenv').config();
const{API_URL_POKES}= process.env; */
const API_URL_POKES = 'https://pokeapi.co/api/v2/pokemon';

/*const pokeApiTemplate = (poke)=>{
    return {
        id: poke.id,
        name: poke.name, 
        height: poke.height,
        weight: poke.weight,
        hp: poke.stats[0].base_stat,
        speed: poke.stats[5].base_stat,
        attack: poke.stats[1].base_stat,
        defense: poke.stats[2].base_stat,
        types: poke.types.map(t=> t.type.name),
        image: poke.sprites.other.dream_world.front_default        
    }  
}*/

/* const pokeDbTemplate = (poke)=>{
    return {
        id: poke.id,
        name: poke.name, 
        height: poke.height,
        weight: poke.weight,
        hp: poke.hp,
        speed: poke.speed,
        attack: poke.attack,
        defense: poke.defense,
        types:  poke.types.map(e=>e.name),
        image: poke.image       
    }  
} */

/* async function getAllApiPokes(){
    try{
     

    }catch(e){
   
        console.log(e)
        return e
    }

} */

 async function getAllDbProducts(){
    try{
        const dbProducts = await Product.findAll({
            /* include: {
                model: Type,
                attributes: ['name']
            } */
        })    

        /* const pokesDbInfo = dbProducts.map(p => pokeDbTemplate(p)) */
        
        return  dbProducts

    }catch(e){
        console.log(e)
        return e
    }
} 

 async function getAllProducts (){
    try{
        /* const [pokesApi, pokesDb] = await Promise.all([getAllApiPokes(), getAllDbPokes()]);
        return [...pokesApi, ...pokesDb]; */
        const dbProducts = await getAllDbProducts()
        return dbProducts
    }catch(e){
        /* console.log('pokesApi')
        console.log(pokesApi) */
        console.log(e)
        return e
    }
} 

 
//BY NAME
/* async function getApiPokeByName(name){
    try{
        const apiPokeByName = await axios.get(`${API_URL_POKES}/${name.toLowerCase().toString()}`);
        let pokeInfo =  apiPokeByName.data? pokeApiTemplate(apiPokeByName.data) : 'PDNE'          
        
        return pokeInfo
        
    }catch(e){
        
        return 'PDNE'
    }
} */

/* async function getDbPokeByName(name){
    try{
        let dbPokeByName =  await Pokemon.findAll({
            where: {name},
            include: {model: Type}
        })
        if(dbPokeByName.length === 0){
            return 'PDNE'
        }

        let resp = dbPokeByName.map(e=>pokeDbTemplate(e))
        return resp

    }catch(e){
        
        return 'PDNE'
    }
} */

/* async function getAllPokesByName(name){
    try{
        let apiResult = await getApiPokeByName(name);
        let dbResult = await getDbPokeByName(name);  
        
        if(apiResult === 'PDNE' && dbResult === 'PDNE'){
            return ['PDNE']
        }
        if(apiResult === 'PDNE' && dbResult !== 'PDNE'){
            return dbResult
        }
        if(apiResult !== 'PDNE' && dbResult === 'PDNE'){
            return [apiResult]
        }
        if(apiResult !== 'PDNE' && dbResult !== 'PDNE'){
            let chorro = [apiResult, ...dbResult]
            return chorro
        }

    }catch(e){
        console.log(e)
        return 'error en getAllPokesByName'
    }
} */

//BY ID
/* async function getPokeById(id){
    try{
        if(id.length > 5){
            const pokeDb = await Pokemon.findOne({
                where: {id},
                include: Type
            })        
            return pokeDbTemplate(pokeDb)
        }else{
            const apiPoke = await axios.get(`${API_URL_POKES}/${id.toString()}`); //todo lo que reciba un url debe ser un string
            let pokeInfo =  apiPoke.data? pokeApiTemplate(apiPoke.data) : 'PDNE' 
                
            return pokeInfo
        }      
        }catch(e){
            console.log(e)
            return 'PDNE'
        }
    
} */


module.exports = {
     getAllProducts,
    /* getAllPokesByName,
    getPokeById, */
    getAllDbProducts 
}

