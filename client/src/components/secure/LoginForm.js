import React from 'react';

const LoginForm = (props) => {
   
    return (
        <div>
            <form   onSubmit={(e) => props.submitForm(e)}
                className="login-form">
            
                <div className="row">
                    <div className="input-field col s12 loginFormInput">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="email" 
                            type="email" 
                            className="validate"
                            value={props.email}
                            name="email"
                            onChange={props.handleEmailChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                    
                <div className="row">
                    <div className="input-field col s12 loginFormInput">
                        <i className="material-icons prefix">lock</i>
                        <input id="password" 
                        type="password" 
                        className="validate" 
                        value={props.password}
                        name="password"
                        onChange={props.handlePasswordChange}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" 
                        type="submit" 
                        name="action">Submit
                        <i className="material-icons right">send</i>
                </button>
                    {/* <input  type="submit" 
                            value="Submit" 
                            className="submit-button loginFormInput" /> */}
            </form>
        </div>
    );
}



export default LoginForm;


