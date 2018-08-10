import React from 'react';

const LoginForm = (props) => {
   
    return (
        <div>
            <form   onSubmit={(e) => props.submitForm(e)}
                className="login-form">
            
                    <input type="text"
                        value={props.email}
                        name="email"
                        onChange={props.handleEmailChange} 
                        placeholder="EMAIL"
                        id="loginEmail"
                        className="loginFormInput"
                         />
                    
                    <input type="password"
                        value={props.password}
                        name="password"
                        onChange={props.handlePasswordChange}
                        placeholder="PASSWORD"
                        id="loginPassword"
                        className="loginFormInput"
                         />
                    <input  type="submit" 
                            value="Submit" 
                            className="submit-button loginFormInput" />
            </form>
        </div>
    );
}



export default LoginForm;


