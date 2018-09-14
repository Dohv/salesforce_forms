import React, { Component } from 'react';
import './App.css';
import authServices from './services/authServices';
import formDataServices from './services/formDataServices';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from "./components/layout/Header";
import Login from './components/secure/Login';
import PrivateRoute from './components/secure/PrivateRoute';
import FormMenu from './components/secure/FormMenu';
import Logout from './components/secure/Logout';
import ClientList from './components/secure/ClientList';
import NoMatch from './components/NoMatch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: authServices.isAuthenticated(),
      currentUserId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
      currentUserEmail: localStorage.getItem('email') ? localStorage.getItem('email') : '',
      isLoading: false,
      messageAlert: localStorage.getItem('flashMessage') ? localStorage.getItem('flashMessage') : '',
      sfAccountName: localStorage.getItem('sfAccountName') ? localStorage.getItem('sfAccountName') : '',
      sfAccountId: localStorage.getItem('sfAccountId') ? localStorage.getItem('sfAccountId') : '',
      sfAccountType: localStorage.getItem('sfAccountType') ? localStorage.getItem('sfAccountType') : '',
      clients: JSON.parse(localStorage.getItem('clients')) ? JSON.parse(localStorage.getItem('clients')) : [],
      currentFormPage: 1,
    };

    // Bind functions:
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleLogOutSubmit = this.handleLogOutSubmit.bind(this);
    this.handleMessageReset = this.handleMessageReset.bind(this);
    this.handleNextFormPage = this.handleNextFormPage.bind(this);
    this.handleLastFormPage = this.handleLastFormPage.bind(this);
  }
  
  handleNextFormPage() {
    console.log('in handleNextFormPage function');
    let next = this.state.currentFormPage + 1;
    this.setState({ currentFormPage: next, });
  }

  handleLastFormPage() {
    console.log('in handleLastFormPage function');
    let last = this.state.currentFormPage - 1;
    this.setState({ currentFormPage: last, });
  }

  async handleSignInSubmit(email, password) {
    this.setState({ isLoading: true })
    await authServices.logIn(email, password);
    this.setState({ 
      currentUserId: localStorage.getItem('id'),
      currentUserEmail: localStorage.getItem('email'),
      isLoggedIn: authServices.isAuthenticated(),
      messageAlert: localStorage.getItem('flashMessage'),
      isLoading: false,
      sfAccountName: localStorage.getItem('sfAccountName'),
      sfAccountId: localStorage.getItem('sfAccountId'),
      sfAccountType: localStorage.getItem('sfAccountType'),
    });
    await formDataServices.getClientsAPI(this.state.sfAccountId);
    this.setState({
      clients: JSON.parse(localStorage.getItem('clients')),
    })
  } 

  async handleLogOutSubmit() {
    await authServices.logOut();
      this.setState({ 
        isLoggedIn: authServices.isAuthenticated(),
        currentUserId: '',
        currentUserEmail: '',
        sfAccountId: '',
        sfAccountType: '',
        clients: [],
       });
  }

  handleMessageReset() {
    localStorage.removeItem('flashMessage');
    this.setState({ messageAlert: '' })
  }

  
  render() {
    const headerhandler = this.state.isLoggedIn ? <Header currentUserEmail={this.state.currentUserEmail} handleLogOutSubmit={this.handleLogOutSubmit} isLoggedIn={this.state.isLoggedIn} sfAccountType={this.state.sfAccountType} /> : '';
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
                                                sfAccountType={this.state.sfAccountType}
                                              />} /> 
              <PrivateRoute path={'/forms'} component={props => <FormMenu {...props} sfAccountType={this.state.sfAccountType} currentFormPage={this.state.currentFormPage} handleNextFormPage={this.handleNextFormPage} handleLastFormPage={this.handleLastFormPage}/>} />;
              <PrivateRoute path={'/clients'} component={props => <ClientList {...props} clients={this.state.clients} />} />
              <Route path='/logout' component={props => <Logout {...props} handleLogOutSubmit={this.handleLogOutSubmit} />} />
              <Route component={NoMatch} />
            </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
