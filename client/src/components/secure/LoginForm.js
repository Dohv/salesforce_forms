import React from 'react';
import Loading from '../Loading';
import { Row, Button } from 'react-materialize';

const timeBasedGreeting = () => {
    let greeting = "";
    let time = new Date().getHours();
    if (time < 10) {
        greeting = "Good Morning!";
    } else if (time < 20) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
 return greeting;
}

const LoginForm = (props) => {
    console.log(props.isLoading);
    const loading = props.isLoading ? <div className='loadingAnimation'><Loading /></div> : <div className='emptyLoadingSpace'></div>;
    return (
        <div>
            <form   onSubmit={(e) => props.submitForm(e)}
                className="login-form">
            <div className="greeting">{timeBasedGreeting()}</div>
            
                <div className="row">
                    <div className="input-field col s12 loginFormInput">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="email" 
                            type="email" 
                            value={props.email}
                            name="email"
                            onChange={props.handleEmailChange} />
                        <label className='login-label' htmlFor="email">Email</label>
                    </div>
                </div>
                    
                <div className="row password-animation-container">
                    <div className="input-field col s12 loginFormInput">
                        <i className="material-icons prefix">lock</i>
                        <input id="password" 
                        type="password" 
                        value={props.password}
                        name="password"
                        onChange={props.handlePasswordChange}
                        />
                        <label className='login-label' htmlFor="password">Password</label>
                    </div>
                    {loading}
                </div>
                <Row>
                    <Button className="btn waves-effect waves-light login-submit light-blue darken-4" 
                        type="submit" 
                        name="action">Submit</Button>
                </Row>
                <div className="logo">
                    <img id="klik_logo" src={require('../../assets/klik_logo.jpg')} alt="klik_logo" />
                </div> 
            </form>
        </div>
    );
}



export default LoginForm;


