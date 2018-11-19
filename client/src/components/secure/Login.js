import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import LoginForm from './LoginForm';   

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            valid: false,
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        if (this.state.email === '' || this.state.password === '') {
            this.setState({valid: false})
        } else {
            this.setState({valid: true});
            this.props.handleSignInSubmit(this.state.email, this.state.password);
        }

        return false;
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
        
        const {target} = this.props.location.state || {target: {pathname: '/forms'}}

        if(this.props.isLoggedIn) {
            return <Redirect to={target} />
        }
        return (
                <div className='loginPage'>
                    <LoginForm email={this.state.email} password={this.state.password} handleEmailChange={this.handleEmailChange} handlePasswordChange={this.handlePasswordChange} submitForm={this.submitForm} isLoading={this.props.isLoading} 
                    />

                </div>
        );
    }
}

export default Login;