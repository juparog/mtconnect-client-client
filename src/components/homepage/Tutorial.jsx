import React, { Component } from "react";

import { Link } from 'react-router-dom';

class Tutorial extends Component {
  
  render() {
    return (
      <>
        <div className="container border rounded my-5">
          <div className="jumbotron">
            <h1 className="display-4">Tutorial en construcion!</h1>
            <p className="lead">Esta pagina se encuentra actualmente en construccion por parte de los desarrolladores de MTConnect Client.</p>
            <i className="fas fa-tools fa-3x"></i>
            <hr className="my-4"/>
            <p className="lead">
              <Link to="/home" className="btn btn-primary btn-lg">Inicio</Link>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Tutorial;
