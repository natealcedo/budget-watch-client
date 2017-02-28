import axios from "axios";

export function isUserExists(identifier){
  return dispatch =>{
    return axios.get(`/api/users/${identifier}`);
  };
}

export function userSignUp(data){
  return dispatch => {
    return axios.post("/api/signup", data);
  };
}
