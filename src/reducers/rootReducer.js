import { combineReducers } from "redux";

import authentication from "./authentication";
import flashMessages from "./flashMessages";

export default combineReducers({
  authentication,
  flashMessages
});
