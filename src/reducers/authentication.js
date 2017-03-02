import { SET_USER } from "../actions/actionTypes";
import { isEmpty } from "lodash";

const initState={
  isAuthenticated: false,
  user: {}
};

export default function authentication(state=initState, action){
  switch(action.type){
  case SET_USER: 
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user
    }; 
  default: return state;
  }
}
