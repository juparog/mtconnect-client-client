// Dependencias 
import React, { Component } from "react";
import { Jumbotron, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo'

// Querys
import { Querys } from '../../utils/querys';

class Home extends Component {
  
  render() {
    return (
      <Query query={Querys.AllUser}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error){
            console.log(error);
            return <div>Error: {error.message}</div>
          }
    
          const users = data.allUser;
    
          return (
            <>
              <div className="text-center mb-5">
                <h1 className="display-3 text-center mt-5 mb-3 text-primary font-weight-bold">MTConnect Client</h1>
                <p className="text-center text-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit neque minus molestias debitis dolor aspernatur, iste quo nostrum quasi, fuga a atque quos, aperiam maxime consectetur ducimus ad architecto eum..
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis vel distinctio nam eos, ducimus perspiciatis eius ad enim perferendis at animi magnam eaque natus adipisci reprehenderit consequatur voluptatem, amet eveniet.
                </p>
                <Button variant="outline-secondary" size="sm">Saber mas +</Button>
              </div>
              <section>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                        <div className="features-icons-icon d-flex">
                          <i className="fas fa-desktop fa-5x m-auto"></i>
                        </div>
                        <h3 className="text-center mt-5">Fully Responsive</h3>
                        <p className="text-center lead mb-0">This theme will look great on any device, no matter the size!</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                        <div className="features-icons-icon d-flex">
                          <i className="fas fa-layer-group fa-5x m-auto"></i>
                        </div>
                        <h3 className="text-center mt-5">Fully Responsive</h3>
                        <p className="text-center lead mb-0">This theme will look great on any device, no matter the size!</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                        <div className="features-icons-icon d-flex">
                          <i className="fas fa-check fa-5x m-auto"></i>
                        </div>
                        <h3 className="text-center mt-5">Fully Responsive</h3>
                        <p className="text-center lead mb-0">This theme will look great on any device, no matter the size!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="Home">
                <Jumbotron className="my-5 text-center bg-secondary">
                  <h1>MTConnent Client</h1>
                  <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto vero totam consequuntur tenetur accusantium, necessitatibus consequatur dolorem, eum beatae suscipit repudiandae facilis officia odit, id modi sit deleniti provident deserunt!.
                  </p>
                  <p>
                      <Link to="/dashboard">Dashboard</Link>
                  </p>
                  <div>
                    users: {users.map(user => <div key={user._id}>{user.username}</div>)}
                  </div>
                </Jumbotron>
              </div>
            </>
          )
        }}
      </Query>
    );
  }
}

export default Home;
