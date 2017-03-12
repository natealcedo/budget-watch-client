import React from "react";
import { Route, IndexRoute } from "react-router";

import AddEntry from "./components/Entries/AddEntry";
import Analyis from "./components/Analysis/Analysis";
import App from "./components/App";
import AuthenticateRoute from "./utilities/AuthenticateRoute";
import Entry from "./components/Entries/Entry";
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound";
import Signup from "./components/Signup/Signup";
import ViewEntriesByTime from "./components/ViewEntriesByTime/ViewEntriesByTime";

export default(
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={AuthenticateRoute(Entry)} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="entries/addEntry" component={AuthenticateRoute(AddEntry)} />
      <Route path="entries/viewEntriesByTime" component={AuthenticateRoute(ViewEntriesByTime)} />
      <Route path="analysis" component={AuthenticateRoute(Analyis)} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);
