import axios from "axios";
import {
  GET_PETS,
  GET_PET_NAME,
  GET_TO_DETAILS,
  POST_PET,
  CLEAN_DETAILS,
  LOGIN_GOOGLE,
  LOGIN,
  LOGOUT,
  REGISTER,
  USERS,
  DELETE_PETS,
  EDIT_PET,
} from "./nameAction";

export function getPets(page, filter) {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/pet?page=${page}`, filter);
      dispatch({ type: GET_PETS, payload: res.data });
      // console.log(res.data)
    } catch (e) {
      dispatch({ type: GET_PETS, payload: e.response.data });
    }
  };
}

export function searchByName(payload) {
  return async (dispatch) => {
    try {
      console.log("searchByName -->", payload);
      const res = await axios.put(`/pet`, payload);
      dispatch({ type: GET_PET_NAME, payload: res.data });
    } catch (e) {
      dispatch({ type: GET_PET_NAME, payload: e.response.data });
    }
  };
}

export const petitionLoad = (payload) => {
  // console.log("petitionLoad -->", payload);
  return async function (dispatch) {
    try {
      const res = await axios.post(`/petitionLoad/`, payload);
      dispatch({ type: POST_PET, payload: res.data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const petitionGet = (payload) => {
  // console.log("petitionGet -->", payload);
  return async function (dispatch) {
    try {
      const res = await axios.post(`/petitionGet/`, payload);
      dispatch({ type: POST_PET, payload: res.data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const petitionGetLost = (payload) => {
  // console.log("petitionGetLost -->", payload);
  return async function (dispatch) {
    try {
      const res = await axios.post(`/petitionGet/lost`, payload);
      dispatch({ type: POST_PET, payload: res.data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const editPet = (payload) => {
  return {type: EDIT_PET, payload}
}

export function getById(id) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/pet/${id}`);
      dispatch({ type: GET_TO_DETAILS, payload: res.data });
    } catch (e) {
      dispatch({ type: GET_TO_DETAILS, payload: e.response.data });
    }
  };
}

export function cleanDetail() {
  return async (dispatch) => {
    dispatch({ type: CLEAN_DETAILS, payload: [] });
  };
}

export function getGoogle(info) {
  // console.log('estoy en',info)
  return async (dispatch) => {
    try {
      const  res  = await axios.post(`/auth/google/callback`, info);
      localStorage.setItem("InfoSeccion", JSON.stringify(res.data))
      dispatch({ type: LOGIN_GOOGLE, payload: res.data })
    } catch (err) {
      console.log(err)
    }
  }

}
export const loginManual = (payload) => {
  return { type: LOGIN, payload }
};

export const getLogOut = () => {
  localStorage.removeItem("userInfo");
  return {type: LOGOUT, payload: null};
} 

export const upLogin = (user) => {
  return {type: LOGIN, payload: user};
}


export const postRegister = (payload) => {
  // console.log("postRegister -->", payload);
  return async function (dispatch) {
    try {
      const res = await axios.post('/user/register', payload);
      dispatch({ type: REGISTER, payload: res.data });
    } catch (e) {
      console.log(e);
    }
  };
};


export const getUsers = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get('/user');
      dispatch({ type:USERS, payload: res.data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deletePet = (id, payload) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/pet/${id}`, payload);
      dispatch({type: DELETE_PETS, payload: res.data})
    } catch(err) {
      console.log(err)
    }
  }
}
