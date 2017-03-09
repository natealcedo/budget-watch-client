import axios from "axios";
import { SET_ENTRIES } from "./actionTypes";

export function addEntry(data){
  return dispatch => {
    return axios.post("/api/entry", data);
  };
}

export function getAllEntries(){
  return dispatch => {
    return axios.post("api/entry/getAll").then(res => {
      dispatch(setEntries(res.data.entries));
    });
  };
}

function setEntries(entries){
  return {
    type: SET_ENTRIES,
    entries
  };
}

function deleteEntry(id){
  return {
  }
}
