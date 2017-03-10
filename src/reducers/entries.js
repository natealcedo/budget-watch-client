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
    const { sortFilter } = action;
    return state.sort((prev, curr) => {
      return curr[sortFilter] - prev[sortFilter];
    });
  default: 
    return state;
  }
}
