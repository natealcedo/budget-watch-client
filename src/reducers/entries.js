import { SET_ENTRIES, UNSET_ENTRIES, DELETE_ENTRY, SET_SORT } from "../actions/actionTypes";
import { findIndex } from "lodash";

export default function(state=[], action={}){
  switch(action.type){
  case SET_ENTRIES:
    return [
      ...state,
      ...action.entries
    ]; 
  case UNSET_ENTRIES:
    return [];
  case DELETE_ENTRY:
    const index = findIndex(state, { _id: action.id }) ;
    if(index >= 0){
      return [
        ...state.slice(0,index),
        ...state.slice(index + 1)
      ];
    } else {
      return state;
    }
  case SET_SORT:
    if(action.sortFilter === "category"){
      return state.slice().sort((a,b) => {
        if(a.category.toLowerCase() < b.category.toLowerCase()) return -1;
        if(a.category.toLowerCase() > b.category.toLowerCase()) return 1;
        return 0;
      });
    } else {
      return state.slice().sort((prev, curr) => {
        return curr[action.sortFilter] - prev[action.sortFilter];
      });
    }
  default: 
    return state;
  }
}
