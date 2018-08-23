import React, { Component } from 'react';
import './App.css';
import authServices from './services/authServices';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from "./components/layout/Header";
//import Sidebar from "./components/layout/Sidebar";
import Login from './components/secure/Login';
//import Home from './components/Home';
import PrivateRoute from './components/secure/PrivateRoute';
import FormMenu from './components/secure/FormMenu';
import Logout from './components/secure/Logout';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: authServices.isAuthenticated(),
      currentUserId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
      currentUserEmail: localStorage.getItem('email') ? localStorage.getItem('email') : '',
      isLoading: false,
      messageAlert: localStorage.getItem('flashMessage') ? localStorage.getItem('flashMessage') : ''
    };

    // Bind functions:
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleLogOutSubmit = this.handleLogOutSubmit.bind(this);
    this.handleMessageReset = this.handleMessageReset.bind(this);
  }


  
  async handleSignInSubmit(email, password) {
    this.setState({ isLoading: true })
    await authServices.logIn(email, password);
    this.setState({ 
      currentUserId: localStorage.getItem('id'),
      currentUserEmail: localStorage.getItem('email'),
      isLoggedIn: authServices.isAuthenticated(),
      messageAlert: localStorage.getItem('flashMessage'),
      isLoading: false
    });
  } 

  async handleLogOutSubmit() {
    await authServices.logOut();
      this.setState({ 
        isLoggedIn: authServices.isAuthenticated(),
        currentUserId: '',
        currentUserEmail: '',
       });
  }

  handleMessageReset() {
    localStorage.removeItem('flashMessage');
    this.setState({ messageAlert: '' })
  }

  
  render() {
    const headerhandler = this.state.isLoggedIn ? <Header goBack={this.goBack} handleLogOutSubmit={this.handleLogOutSubmit} isLoggedIn={this.state.isLoggedIn}/> : '';
    
    return (
      <BrowserRouter>
        <div>
            {headerhandler}
            <Switch>
              <Route exact path="/login" component={props => <Login {...props}
                                                handleSignInSubmit={this.handleSignInSubmit} isLoggedIn={this.state.isLoggedIn}
                                                isLoading={this.state.isLoading}
                                                messageAlert={this.state.messageAlert}
                                                handleMessageReset={this.handleMessageReset}
                                              />} /> 

              <PrivateRoute path={'/private'} component={FormMenu}/>            
              <Route path='/logout' component={props => <Logout {...props} handleLogOutSubmit={this.handleLogOutSubmit}
              />} />

            </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
