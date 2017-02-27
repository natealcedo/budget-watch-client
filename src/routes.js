import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Login from "./components/Login.js";

export default(
    <Route path="/" component={App}>
        <IndexRoute />
        <Route path="login" component={Login} />
    </Route>
);
