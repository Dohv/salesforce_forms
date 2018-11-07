import React from 'react';
import Loading from '../Loading';
//import { Row } from 'react-materialize';
import { Form, Row, Col, Button, FormControl, FormGroup, InputGroup, HelpBlock } from 'react-bootstrap';

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
        <div className='login-form'>
            <form   onSubmit={(e) => props.submitForm(e)}
                className='center-form'>
            <div className="greeting">{timeBasedGreeting()}</div>
            
                
                <FormGroup>
                    <InputGroup>
                    <InputGroup.Addon><i className="fas fa-user"></i></InputGroup.Addon>
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
                    <InputGroup.Addon><i className="fas fa-lock"></i></InputGroup.Addon>
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
                            id='login-button'
                            bsStyle="primary" 
                            type="submit" 
                            name="action">
                            Login
                        </Button> 
                    </div>
                    {loading}
                    
            </form>
        </div>
    );
}



export default LoginForm;


