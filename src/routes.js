import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Login from "./components/Login.js";
import PageNotFound from "./components/PageNotFound";
import Signup from "./components/Signup";

export default(
    <Route>
        <Route path="/" component={App}>
            <IndexRoute />
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
        </Route>
        <Route path="*" component={PageNotFound} />
    </Route>
);
