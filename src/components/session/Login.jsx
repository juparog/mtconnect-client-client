// Dependencias
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

// Mutaciones
import Mutations from '../../utils/mutations';

// Recursos
import logo from '../../../public/logo.png';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            d_alert: 'd-none',
            errors_signin: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        alert('A name was submitted: ' + this.state.password);
        event.preventDefault();
    }

    handleShowAlert(){
        this.setState({
            d_alert: 'd-none'
        });
    }
    
    render(){
        return(
            <>
            <Mutation mutation={Mutations.LoginUser}>
            { LoginUser => (
                <div className="col mt-5 p-5">
                    <div className="row">
                        <h3 className="text-primary text-center w-100 font-weight-bold">MTConnect Client</h3>
                    </div>
                    <div className="row">
                        <div className="card card-login col-md-4 mx-auto text-center bg-dark">
                            <div className="card-header mx-auto bg-dark">
                                <span> <img src={logo} alt="" className="w-50"/> </span><br />
                                <span className="mt-5 text-white"> Iniciar sesión </span>
                                <div className={"alert alert-danger alert-dismissible fade show "+this.state.d_alert}>
                                    { this.state.errors_signin.length? "* "+this.state.errors_signin[0].path+": "+this.state.errors_signin[0].message : null }
                                    <button onClick={this.handleShowAlert} type="button" className="close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <form onSubmit={
                                    event => {
                                        LoginUser({ variables: {
                                            email: this.state.email,
                                            password: this.state.password
                                        }}).then( res => {
                                            console.log(res);
                                            const { success, token, errors } = res.data.loginUser;
                                            if(!success){
                                                this.setState({
                                                    d_alert: 'd-block',
                                                    errors_signin: errors
                                                });
                                            }else{
                                                localStorage.setItem("token", token);
                                                // redireccionar
                                                this.props.history.push("/");
                                            }
                                        });
                                        event.preventDefault();
                                    }
                                }>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input value={this.state.email} onChange={this.handleChange} name="email" type="text" className="form-control" autoFocus autoComplete="email" placeholder="ejemplo@correo.com" required/>
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input value={this.state.password} onChange={this.handleChange} name="password" type="password" className="form-control" autoComplete="current-password" placeholder="contraseña" required/>
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Ingresar" className="btn btn-primary float-center"/>
                                        <br/>
                                        <div className="dropdown-divider"></div>
                                        <span className="mb-5">
                                            <Link to="/session/signup" className="text-primary">Resgistrarse  </Link>ó
                                            <Link to="/home" className="text-primary">  Inicio</Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </Mutation>
            </>
        );
    }
}

export default Login;