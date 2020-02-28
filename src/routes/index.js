import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";

import Home from "../containers/home/Home.jsx";
import Dashboard from "../containers/dashboard/Dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route exact path={routes.home} component={Home} />
      <Route path={routes.dashboard} component={Dashboard} />
    </Switch>
  );
}
