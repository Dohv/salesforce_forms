import React from 'react';
import Loading from '../Loading';
import { Image, Button, FormControl, FormGroup, InputGroup, HelpBlock, Col } from 'react-bootstrap';

import logo from '../../assets/checkalt_login@3x.png';

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
    const loading = props.isLoading ? <div className='loadingAnimation'><Loading /></div> : <div className='emptyLoadingSpace'></div>;
    
    return (
        <div id='login-form' className='login-form'>
            <form   onSubmit={(e) => props.submitForm(e)}
                className='center-form'>
            <div className="greeting">{timeBasedGreeting()}</div>
            
                
                <FormGroup>
                    <InputGroup>
                    <InputGroup.Addon><i className="far fa-user"></i></InputGroup.Addon>
                    <FormControl 
                        autoFocus
                        id="email" 
                        type="email" 
                        placeholder='Email'
                        value={props.email}
                        name="email"
                        onChange={props.handleEmailChange}/>
                    </InputGroup>
                </FormGroup>  
                
                <FormGroup>
                    <InputGroup>
                    <InputGroup.Addon><i className="far fa-lock"></i></InputGroup.Addon>
                    <FormControl id="password" 
                            type="password" 
                            placeholder='Password'
                            value={props.password}
                            name="email"
                            onChange={props.handlePasswordChange}/>
                    </InputGroup>
                </FormGroup> 
              
                    <div className='login-button-container'>
                        <Button 
                            className='login-button' 
                            type="submit" 
                            name="action">
                            Login
                        </Button> 
                    </div>
                    {loading}
                    
            </form>
            <Image className='checkalt_login_logo' src={logo} responsive />
            <p className='copy-right'>Powered by Checkalt &copy; 2018</p>
        </div>
    );
}



export default LoginForm;


