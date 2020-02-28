import React, { Component } from 'react';

import logo from '../../../public/logo.png';

class FooterHome extends Component{

    render(){
        return(
            <footer className="bg-dark mt-5">
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
