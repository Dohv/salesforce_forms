import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';   


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            email_error: null,
            password: '',
            password_error: null,
            valid: false,
            areRequiredAccountFields: false,
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.validate = this.validate.bind(this);
        this.checkFields = this.checkFields.bind(this);
    }

    componentWillMount() {
        this.checkFields();
    }

    // componentDidMount() {
    //     console.log('componentDidMount' , 'isLoggedIn' , this.props.isLoggedIn);
    // }

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

    validate(e) {
       if(e.target.value === '' || e.target.value === null) {
            this.setState({
                [`${e.target.name}_error`]: 'error',
            }, () => {})
        } else {
            this.setState({
                [`${e.target.name}_error`]: null,
            }, () => {})
        }
    }

    checkFields() {  
        let counter = 0;    
        const accountFields = [
            localStorage.getItem('FI_Name'),
            localStorage.getItem('FI_Contact_Name'),
            localStorage.getItem('FI_Contact_Title'),
            localStorage.getItem('FI_Contact_Email'),
            localStorage.getItem('FI_Contact_Phone'),
            localStorage.getItem('Primary_Contact'),
            localStorage.getItem('Primary_Email'),
            localStorage.getItem('Name'),
            localStorage.getItem('Phone'),
            localStorage.getItem('Website'),
            localStorage.getItem('Company_Address_Street'),
            localStorage.getItem('Company_Address_City'),
            localStorage.getItem('Company_Address_State'),
            localStorage.getItem('Company_Address_Zip'),
            localStorage.getItem('Account_Receivables_Software_Name'),
            localStorage.getItem('Peak_Day'),
            localStorage.getItem('Web_Access'),
            localStorage.getItem('Web_Access_Admin_Name_1'),
            localStorage.getItem('Web_Access_Admin_Email_1'),
            localStorage.getItem('Web_Access_Admin_Phone_1')
        ];
        
        for (let i = 0; i < accountFields.length; i++) {
             if(accountFields[i] === '' || accountFields[i] === null) {
                this.setState({
                    areRequiredAccountFields: false,
                })
                
                return;
             } else  {
                this.setState({
                    areRequiredAccountFields: true,
                }) 
             }
            
        }
    }

    
    render() {
        
        // const {target} = this.props.location.state || {target: {pathname: '/lockboxes'}}
        // console.log('render' , 'areRequiredAccountFields', this.props.areRequiredAccountFields);
        if(this.props.isLoggedIn) {
            if(this.state.areRequiredAccountFields) {
                return <Redirect to={'/lockboxes'} />
            } else {
                return <Redirect to={'/account'} />
            } 
        }
        return (
                <div className='loginPage'>
                    <LoginForm email={this.state.email} password={this.state.password} handleEmailChange={this.handleEmailChange} handlePasswordChange={this.handlePasswordChange} submitForm={this.submitForm} isLoading={this.props.isLoading} validate={this.validate} emailError={this.state.email_error} passwordError={this.state.password_error}
                    />
                </div>
        );
    }
}

export default Login;