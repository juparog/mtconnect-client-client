import React, { Component } from 'react';

import { Jumbotron, Button } from 'react-bootstrap';

class ContentHome extends Component{

    render(){
        return(
            <Jumbotron className="bg-primary my-5 text-center">
                <h1>MTConnent Client</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto vero totam consequuntur tenetur accusantium, necessitatibus consequatur dolorem, eum beatae suscipit repudiandae facilis officia odit, id modi sit deleniti provident deserunt!.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
        );
    }
}

export default ContentHome;