/* import {
  // aqui nombre de action
  GET_PETS,
  GET_PET_NAME,
  GET_TO_DETAILS,
  CLEAN_DETAILS,
  // GET_LOST_PETS,
  LOGIN,
  LOGOUT,
  LOGIN_GOOGLE,
  POST_PET,
  USERS,
  EDIT_PET,
} from "../actions/nameAction"; */

const initialState = {
  // aqui mis estados
  pets: [],
  petsAmount: {},
  petDetail: [],
  lostpets: [],
  usuario: null,
  urlFront:  import.meta.env.VITE_APP_FRONT || "http://localhost:3000",
  urlBack: import.meta.env.VITE_APP_API || "http://localhost:3001",
  google:[],
  usuarios:[],
  user:[]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    /* case GET_PETS: {
      return {
        ...state,
        pets: action.payload.pets,
        petsAmount: action.payload.total,
      };
    } */

    /* case GET_PET_NAME: {
      console.log("respuesta del back --> abajo");
      console.log(action.payload);
      return {
        ...state,
        pets: action.payload.pets,
        petsAmount: action.payload.total,
      };
    } */

    /* case GET_TO_DETAILS: {
      return {
        ...state,
        petDetail: action.payload,
      };
    } */
    /* case LOGIN_GOOGLE: {
      return{
        ...state,
         google: action.payload
      }
    } */

    /* case CLEAN_DETAILS: {
        return {
            ...state,
            petDetail: action.payload,
        }
    } */

    /* case LOGIN:{
      return{
        ...state,
        usuario: action.payload
      }
     } */

    /* case LOGOUT:{
      return {
        ...state,
        usuario: action.payload,
      }
    } */

    /* case POST_PET:{
      return {
        ...state,        
      }
    } */

    /* case USERS:{
      return{
        ...state, 
        usuarios: action.payload
      }
    } */

    default: {
      return state;
    
    }
  }
};

export default rootReducer;
