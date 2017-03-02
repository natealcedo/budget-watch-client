import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Login from "./components/Login/Login";
import Welcome from "./components/Welcome/Welcome";
import PageNotFound from "./components/PageNotFound";
import Signup from "./components/Signup/Signup";

export default(
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={Welcome} />
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
        </Route>
        <Route path="*" component={PageNotFound} />
    </Route>
);
