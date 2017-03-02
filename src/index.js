import React from "react";
import ReactDOM from "react-dom";
import jwtDecode from "jwt-decode";
import rootReducer from "./reducers/rootReducer";
import routes from "./routes";
import setAxiosHeaders from "./utilities/setAxiosHeaders";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { setUser } from "./actions/loginActions";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if(localStorage.jwt){
  setAxiosHeaders(localStorage.jwt);
  store.dispatch(setUser(jwtDecode(localStorage.jwt)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
