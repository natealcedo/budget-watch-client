import { combineReducers } from "redux";

import authentication from "./authentication";
import flashMessages from "./flashMessages";
import entries from "./entries";

export default combineReducers({
  authentication,
  flashMessages,
  entries
});
