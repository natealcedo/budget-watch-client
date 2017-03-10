import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Entry from "./components/Entries/Entry";
import AddEntry from "./components/Entries/AddEntry";
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound";
import Signup from "./components/Signup/Signup";
import AuthenticateRoute from "./utilities/AuthenticateRoute";

export default(
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={AuthenticateRoute(Entry)} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="entries/addEntry" component={AuthenticateRoute(AddEntry)} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);
