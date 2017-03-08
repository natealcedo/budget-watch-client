import shortid from "shortid";
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from "../actions/actionTypes";
import { findIndex } from "lodash";

export default function(state=[], action={}){
  switch(action.type){
  case ADD_FLASH_MESSAGE:
    return [
      ...state,
      {
        id: shortid.generate(),
        text: action.message
      }
    ];
  case DELETE_FLASH_MESSAGE:
    const index = findIndex(state, { id: action.id }) ;
    if(index >= 0){
      return [
        ...state.slice(0,index),
        ...state.slice(index + 1)
      ];
    } else {
      return state;
    }
  default: return state; 
  }
}
