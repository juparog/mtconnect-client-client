// Dependencias
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

// Mutaciones
import Mutations from '../../utils/mutations';

class Logup extends Component{

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            d_alert: 'd-none',
            errors_singup: []
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
        alert('A name was submitted: ' + this.state.first_name);
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
            <Mutation mutation={Mutations.CreateUser}>
            { CreateUser => (
                <form onSubmit={
                    event => {
                        CreateUser({ variables: {
                            first_name: this.state.first_name,
                            last_name:this.state.last_name,
                            username: this.state.username,
                            email: this.state.email,
                            password: this.state.password
                        }}).then( res => {
                            const { success, errors } = res.data.createUser;
                            if(!success){
                                this.setState({
                                    d_alert: 'd-block',
                                    errors_singup: errors
                                });
                            }
                        });
                        event.preventDefault();
                    }
                }>
                    <div className="col p-5">
                        <div className="row">
                            <h3 className="text-primary text-center w-100 font-weight-bold">MTConnect Client</h3>
                        </div>
                        <div className="row">
                            <div className="card card-login col-md-4 mx-auto text-center bg-dark">
                                <div className="card-header mx-auto bg-dark">
                                    <h3 className="mt-3 text-white"> ¡Registrarse aquí! </h3>
                                    <div className={"alert alert-danger alert-dismissible fade show "+this.state.d_alert}>
                                        { this.state.errors_singup.length? "* "+this.state.errors_singup[0].path+": "+this.state.errors_singup[0].message : null }
                                        <button onClick={this.handleShowAlert} type="button" className="close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        </div>
                                        <input value={this.state.first_name} onChange={this.handleChange} name="first_name" type="text"  className="form-control" autoFocus autoComplete="first-name" placeholder="Nombre" required />
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        </div>
                                        <input value={this.state.last_name} onChange={this.handleChange} name="last_name" type="text"  className="form-control" autoComplete="last-name" placeholder="Apellido" required />
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        </div>
                                        <input value={this.state.username} onChange={this.handleChange} name="username" type="text"  className="form-control" autoComplete="username" placeholder="Nombre de usuario" required />
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        </div>
                                        <input value={this.state.email} onChange={this.handleChange} name="email" type="text"  className="form-control" autoComplete="email" placeholder="ejemplo@correo.com" required />
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        </div>
                                        <input value={this.state.password} onChange={this.handleChange} name="password" type="password"  className="form-control" autoComplete="password" placeholder="Contraseña" required />
                                    </div>

                                    <div className="row widget">
                                        <div className="col-md-12 col-xs-12 col-sm-12">
                                            <input type="submit" value="Regístrate" className="btn btn-primary float-center"/>
                                        </div>
                                    </div>

                                    <div className="dropdown-divider"></div>
                                    <div>
                                        <span className="mb-5">
                                            <Link to="/session/signin" className="text-primary">Iniciar sesión  </Link>ó
                                            <Link to="/home" className="text-primary">  Inicio</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
            </Mutation>
            </>
        );
    }
}

export default Logup;