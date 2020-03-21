import React, { Component } from 'react';

import logo from '../../../public/logo.png';

class FooterHome extends Component{

    render(){
        return(
            <footer className="bg-primary mt-5 fixed-bottom">
                <div className="footer-copyright text-center py-1 text-light">© 2020 MTConnect Client:
                    <a href="#" className="text-light"> Witsoft</a>
                    <img src={logo}
                        width="30px"
                        height="30px"
                    />
                </div>
            </footer>
        );
    }
}

export default FooterHome;
