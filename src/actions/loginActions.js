import axios from "axios";
import jwtDecode from "jwt-decode";
import setJwtToken from "../utilities/setJwtToken";
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
      setJwtToken(token);
      dispatch(setUser(jwtDecode(token)));
      console.log(jwtDecode(token));
    }).catch(err=>{
      console.log(err);
    });
  };
}
