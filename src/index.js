import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import routes from "./routes";

const store = createStore(
  () => {},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
