import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import RouteWithSubRoutes from '~/components/routeWithSubRoutes/';
import Flash from '~/components/utils/Flash';
import Routes from '~/routes/';

/**
 * Componente principal de la aplicación, renderiza sus
 * componntes hijos segun utlizando el componente Routes
 */
class App extends PureComponent {
  render() {
    return (
      <>
        <Flash />
        <Router>
          <Switch>
            {Routes.map((route, i) => (
              <RouteWithSubRoutes key={i.toString()} {...route} />
            ))}
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
