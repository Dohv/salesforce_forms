import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
//import '../styles/Register.css';
//import MessageAlert from "./MessageAlert";


class LogInForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        this.props.handleSignInSubmit(this.state.email, this.state.password);
    }

    handleEmailChange(event) {
        const email = event.target.value;
        this.setState({
            email
        });
    }

    handlePasswordChange(event) {
        const password = event.target.value;
        this.setState({
            password
        });
    }
    
    render() {
        return (
            <div className="signin-container">
                <h1 className="form-title">Log In:</h1>
                <form   onSubmit={(e) => this.submitForm(e)}
                        className="login-form">
                    {/* <label>Email:</label> */}
                    <input type="text"
                        value={this.state.email}
                        name="email"
                        onChange={this.handleEmailChange} 
                        placeholder="EMAIL" />
                    {/* <label>Password:</label> */}
                    <input type="password"
                        value={this.state.password}
                        name="password"
                        onChange={this.handlePasswordChange}
                        placeholder="PASSWORD" />
                    <input  type="submit" 
                            value="Submit" 
                            className="submit-button" />

                </form>
                {/* <MessageAlert messageAlert={this.props.messageAlert} /> */}
                <Link className="back-link" to='/'>BACK</ Link>
            </div>
        );
    }
}

export default LogInForm;