import React, { Component } from 'react';
import './App.css';
import authServices from './services/authServices';
import formDataServices from './services/formDataServices';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from "./components/layout/Header";
import Login from './components/secure/Login';
import PrivateRoute from './components/secure/PrivateRoute';
import FormMenu from './components/secure/FormMenu';
import Logout from './components/secure/Logout';
import ClientList from './components/secure/ClientList';
import NoMatch from './components/NoMatch';

class App extends Component {
  constructor(props) {
    super(props);
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
      isFormChosen: false,
      currentFormPage: 1,
      enterOffset: 100,
      leaveOffset: -100,
    };

    // Bind functions:
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleLogOutSubmit = this.handleLogOutSubmit.bind(this);
    this.handleMessageReset = this.handleMessageReset.bind(this);
    this.handleFormChoice = this.handleFormChoice.bind(this);
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

  handleFormChoice() {
    this.setState({
      isFormChosen: true,
    }, ()=>{
      const buttons = document.querySelectorAll('.chooseFormButton');
    buttons.forEach((button) => {
      //console.log(button.id);
      if(button.id !== localStorage.getItem('selectedForm')) {
        button.classList.add("mystyle");
      } else {
        button.classList.add("changeFormMenu")
      }
    })
    })
  }

  render() {
    const headerhandler = this.state.isLoggedIn ? <Header currentUserEmail={this.state.currentUserEmail} handleLogOutSubmit={this.handleLogOutSubmit} isLoggedIn={this.state.isLoggedIn} sfAccountType={this.state.sfAccountType} removeFormChoice={this.removeFormChoice} /> : '';
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
              <PrivateRoute path={'/forms'} component={props => <FormMenu {...props} 
                                                sfAccountType={this.state.sfAccountType} 
                                                handleFormChoice={this.handleFormChoice} 
                                                isFormChosen={this.state.isFormChosen} 
                                              />} />;
              <Route exact path="/" render={() => (
                this.state.loggedIn ? (
                  <Redirect to="/forms"/>
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>                               
              <PrivateRoute path={'/clients'} component={props => <ClientList {...props} clients={this.state.clients} />} />
              <Route path='/logout' component={props => <Logout {...props} handleLogOutSubmit={this.handleLogOutSubmit} />} />
              <PrivateRoute component={NoMatch} />
            </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
