import React, { Component } from "react";
import { Switch } from 'react-router-dom';

// rutas
import SessionRoutes from '../../routes/session.jsx';
import RouteWithSubRoutes from '../../components/routeWithSubRoutes/RouteWithSubRoutes.jsx';

class Session extends Component{

    constructor(props) {
        super(props);
    }
    
    render(){
        let url = this.props.match.path;
        return(
            <>
                <Switch>
                    {SessionRoutes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </>
        );
    }
}

export default Session;