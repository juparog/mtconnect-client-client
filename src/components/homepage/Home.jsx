// Dependencias
import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Clase para el componentte encargado de mostrar la vista de inicio en la pagina principal
class Home extends PureComponent {
  render() {
    return (
      <>
        <div className="text-center mb-5">
          <h1 className="display-3 text-center mt-5 mb-3 text-primary font-weight-bold">MTConnect Client</h1>
          <p className="text-center text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            neque minus molestias debitis dolor aspernatur, iste quo
            nostrum quasi, fuga a atque quos, aperiam maxime consectetur
            ducimus ad architectoeum... Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Blanditiis vel distinctio nam eos,
            ducimus perspiciatis eius ad enim perferendis at animi magnam
            eaque natus adipisci reprehenderit consequatur voluptatem, amet
            eveniet.
          </p>
          <Button variant="outline-secondary" size="sm">Saber mas +</Button>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <FontAwesomeIcon icon="desktop" size="5x" className="m-auto" />
                  </div>
                  <h3 className="text-center mt-5">Fully Responsive</h3>
                  <p className="text-center lead mb-0">This theme will look great on any device, no matter the size!</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <FontAwesomeIcon icon="layer-group" size="5x" className="m-auto" />
                  </div>
                  <h3 className="text-center mt-5">Fully Responsive</h3>
                  <p className="text-center lead mb-0">This theme will look great on any device, no matter the size!</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <FontAwesomeIcon icon="check" size="5x" className="m-auto" />
                  </div>
                  <h3 className="text-center mt-5">Fully Responsive</h3>
                  <p className="text-center lead mb-0">This theme will look great on any device, no matter the size!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Home;
