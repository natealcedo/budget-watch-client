import axios from "axios";
import { SET_ENTRIES, UNSET_ENTRIES, ADD_ENTRY, DELETE_ENTRY, SET_SORT } from "./actionTypes";

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

function deleteEntryAction(entry){
  return {
    type: DELETE_ENTRY,
    id: entry.id
  };
}

export function getAllEntries(){
  return dispatch => {
    return axios.post("/api/entry/getAll").then(res => {
      dispatch(setEntries(res.data.entries));
    });
  };
}

export function getEntriesByYear({ year }){
  return dispatch => {
    return axios.post("/api/entry/getByYear", { year }).then(res => {
      dispatch(unsetEntries());
      dispatch(setEntries(res.data.entries));
    });
  };
}

export function getEntriesByMonth({ year, month }){
  return dispatch => {
    return axios.post("/api/entry/getByMonth", { year, month }).then(res => {
      dispatch(unsetEntries());
      dispatch(setEntries(res.data.entries));
    });
  };
}


export function sortEntries(sortFilter){
  return {
    type: SET_SORT,
    sortFilter
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
