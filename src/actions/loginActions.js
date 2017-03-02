import axios from "axios";
import jwtDecode from "jwt-decode";
import setAxiosHeaders from "../utilities/setAxiosHeaders";
import { SET_USER } from "../actions/actionTypes";


export function setUser(user){
  return {
    type: SET_USER,
    user
  };
}

export function isUserExists(identifier){
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  };
}

export function userLogin(data){
  return dispatch => {
    return axios.post("/api/authentication", data).then(res => {
      const token = res.data.jwt;
      localStorage.setItem("jwt", token);
      setAxiosHeaders(token);
      dispatch(setUser(jwtDecode(token)));
    }).catch(err=>{
      throw err;
    });
  };
}

export function userLogout(){
  return dispatch => {
    localStorage.removeItem("jwt");
    setAxiosHeaders(false);
    dispatch(setUser({}));
  };
}
