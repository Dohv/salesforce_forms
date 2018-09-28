import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

    toast() {
        window.Materialize.toast(this.props.messageAlert, 4000)
        setTimeout(this.props.handleMessageReset, 1);
    }
    
    render() {
        console.log(this.props.isLoading);
        const flashMessage = this.props.messageAlert !== '' ? this.toast() : '';
        

        const {target} = this.props.location.state || {target: {pathname: '/forms'}}

        if(this.props.isLoggedIn) {
            return <Redirect to={target} />
        }
        return (
                <div className='loginPage'>
                    <LoginForm email={this.state.email} password={this.state.password} handleEmailChange={this.handleEmailChange} handlePasswordChange={this.handlePasswordChange} submitForm={this.submitForm} isLoading={this.props.isLoading} />
                    {flashMessage}
                </div>
        );
    }
}

export default Login;