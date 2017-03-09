import { SET_ENTRIES, UNSET_ENTRIES } from "../actions/actionTypes";

export default function(state=[], action={}){
  switch(action.type){
  case SET_ENTRIES:
    return [
      ...state,
      ...action.entries
    ]; 
  case UNSET_ENTRIES:
    return [];
  default: 
    return state;
  }
}
