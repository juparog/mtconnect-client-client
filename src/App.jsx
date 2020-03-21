import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Routes from './routes/index';
import RouteWithSubRoutes from './components/routeWithSubRoutes/RouteWithSubRoutes';

class App extends Component {
  
  render() {
    return (
      <Router>
          <Switch>
            {Routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
      </Router>
    );
  }
}

export default App;
