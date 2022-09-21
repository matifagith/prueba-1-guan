const axios = require("axios");
const Sequelize = require("sequelize");
const { Product, Type } = require("../db");
/* require('dotenv').config();
const{API_URL_POKES}= process.env; */
const API_URL_POKES = "https://pokeapi.co/api/v2/pokemon";
/* const {Op} = require ('sequelize') */

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

async function getAllDbProducts(deletedd) {
  try {
    const dbProducts = await Product.findAll(
      deletedd === "false"
        ? {
            where: { deleted: false },
          }
        : deletedd === "true" && {
            where: { deleted: true },
          }
    );

    /* const pokesDbInfo = dbProducts.map(p => pokeDbTemplate(p)) */

    return dbProducts;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function getAllProducts(deleted) {
  try {
    /* const [pokesApi, pokesDb] = await Promise.all([getAllApiPokes(), getAllDbPokes()]);
        return [...pokesApi, ...pokesDb]; */
    const dbProducts = await getAllDbProducts(deleted);
    return dbProducts;
  } catch (e) {
    /* console.log('pokesApi')
        console.log(pokesApi) */
    console.log(e);
    return e;
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

async function getDbProductByName(name, deletedd) {
  const Op = Sequelize.Op;
  try {
    let dbProductByName = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          {
            code: {
              [Op.like]: `%${name}%`,
            },
          },
        ],
        [Op.and]: [
          deletedd === "false"
            ? { deleted: false }
            : deletedd === "true" && { deleted: true },
        ],
      },
      /* include: {model: Type} */
    });
    if (dbProductByName.length === 0) {
      return [];
    }
    /* let resp = dbProductByName.map(e=>pokeDbTemplate(e)) */
    return dbProductByName;
  } catch (e) {
    return e;
  }
}

/*  async function getAllProductsByName(name){
    try{
        let apiResult = await getApiPokeByName(name);
        let dbResult = await getDbProductByName(name);  
        
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
}  */

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
  getDbProductByName,
  /* getPokeById,  */
  getAllDbProducts,
};
