import { SET_ENTRIES } from "../actions/actionTypes";

export default function(state=[], action={}){
  switch(action.type){
  case SET_ENTRIES:
    return [
      ...state,
      ...action.entries
    ]; 
  default: 
    return state;
  }
}
