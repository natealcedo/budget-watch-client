import axios from "axios";

export function addEntry(data){
  return dispatch => {
    return axios.post("/api/entry", data);
  };
}
