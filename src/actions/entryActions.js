import axios from "axios";
import { SET_ENTRIES, UNSET_ENTRIES, ADD_ENTRY, DELETE_ENTRY } from "./actionTypes";

export function addEntry(data){
  return dispatch => {
    return axios.post("/api/entry", data).then(res => {
      dispatch(addEntryAction(data));
      return res;
    });
  };
}

function addEntryAction(data){
  return {
    type: ADD_ENTRY,
    data
  };
}

function deleteEntryAction(id){
  return {
    type: DELETE_ENTRY,
    id
  };
}

export function getAllEntries(){
  return dispatch => {
    return axios.post("api/entry/getAll").then(res => {
      dispatch(setEntries(res.data.entries));
    });
  };
}

export function setEntries(entries){
  return {
    type: SET_ENTRIES,
    entries
  };
}

export function unsetEntries(){
  return {
    type: UNSET_ENTRIES
  };
}

export function deleteEntry(id){
  return dispatch => {
    return axios({
      method: "delete",
      url: "/api/entry",
      data: id
    }).then(res => {
      dispatch(deleteEntryAction(id));
      return res;
    });
  };
}
