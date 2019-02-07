import React, { Component } from 'react';
import './Reset.css';
import './App.css';
import authServices from './services/authServices';
import formDataServices from './services/formDataServices';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from "./components/layout/Header";
import Login from './components/secure/Login';
import PrivateRoute from './components/secure/PrivateRoute';
import Account from './components/secure/Account';
import FormMenu from './components/secure/FormMenu';
import LBMenu from './components/secure/LBMenu';
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
      sfAccountProducts: JSON.parse(localStorage.getItem("sfAccountProducts")) ? JSON.parse(localStorage.getItem("sfAccountProducts")) : [],
      lockboxes: JSON.parse(localStorage.getItem('lockboxes')) ? JSON.parse(localStorage.getItem('lockboxes')) : [],
      clients: JSON.parse(localStorage.getItem('clients')) ? JSON.parse(localStorage.getItem('clients')) : [],
      isFormChosen: false,
      currentFormPage: 1,
      enterOffset: 100,
      leaveOffset: -100,
      isMenuClicked: false,
      areRequiredAccountFields: false,
    };

    // Bind functions:
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleLogOutSubmit = this.handleLogOutSubmit.bind(this);
    this.handleMessageReset = this.handleMessageReset.bind(this);
    this.handleFormChoice = this.handleFormChoice.bind(this);
    this.handleMobileMenuClick = this.handleMobileMenuClick.bind(this);
    this.removeFormChoice = this.removeFormChoice.bind(this);
    this.handleRequiredAccountFields = this.handleRequiredAccountFields.bind(this);
  }
  

  async handleSignInSubmit(email, password) {
    this.setState({ isLoading: true })
    await authServices.logIn(email, password);
    this.setState({ 
      isLoggedIn: authServices.isAuthenticated(),
      currentUserId: localStorage.getItem('id'),
      currentUserEmail: localStorage.getItem('email'),
      isLoggedIn: authServices.isAuthenticated(),
      messageAlert: localStorage.getItem('flashMessage'),
      isLoading: false,
      sfAccountName: localStorage.getItem('sfAccountName'),
      sfAccountId: localStorage.getItem('sfAccountId'),
      sfAccountType: localStorage.getItem('sfAccountType'),
      sfAccountProducts: JSON.parse(localStorage.getItem('sfAccountProducts')),
      lockboxes: JSON.parse(localStorage.getItem('lockboxes')),
      Phone: localStorage.getItem('Phone'),
      Website: localStorage.getItem('Website'),
      EIN_TIN: localStorage.getItem('EIN_TIN'),
      Company_Address_Street: localStorage.getItem('Company_Address_Street'),
      Company_Address_City: localStorage.getItem('Company_Address_City'),
      Company_Address_State: localStorage.getItem('Company_Address_State'),
      Company_Address_Zip: localStorage.getItem('Company_Address_Zip'),
    })
    await formDataServices.getClientsAPI(this.state.sfAccountId);
    this.setState({
      clients: JSON.parse(localStorage.getItem('clients')),
    })
  } 

  async handleLogOutSubmit() {
    await authServices.logOut(localStorage.getItem('id'));
      this.setState({ 
        isLoggedIn: false,
        currentUserId: '',
        currentUserEmail: '',
        sfAccountId: '',
        sfAccountType: '',
        clients: [],
        areRequiredAccountFields: false,
        }, () => {});
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

  removeFormChoice() {
    this.setState({
      isFormChosen: false,
    });
  }

  timeBasedGreeting = () => {
    let greeting = "";
    let time = new Date().getHours();
    if (time < 12) {
        greeting = "Good Morning, ";
    } else if (time >= 12 && time < 20) {
        greeting = "Good Afternoon, ";
    } else {
        greeting = "Good Evening, ";
    }
 return greeting;
}

handleMobileMenuClick() {
  this.setState({
    isMenuClicked: false,
  })
}

handleRequiredAccountFields() {
  this.setState({
    areRequiredAccountFields: true,
  }, () => {})
}


  render() {
    //document.addEventListener("click", (event) => {console.log(event)})
    const headerhandler = this.state.isLoggedIn ? <Header currentUserEmail={this.state.currentUserEmail} handleLogOutSubmit={this.handleLogOutSubmit} isLoggedIn={this.state.isLoggedIn} sfAccountType={this.state.sfAccountType} removeFormChoice={this.removeFormChoice} isMenuClicked={this.state.isMenuClicked} handleMobileMenuClick={this.isMobileMenuClicked} /> : '';
    return (
      <BrowserRouter>
        <div>
            {headerhandler}
            <Switch>

              <Route exact path="/login" component={props => <Login {...props}
                                                handleSignInSubmit={this.handleSignInSubmit} 
                                                isLoggedIn={this.state.isLoggedIn}
                                                isLoading={this.state.isLoading}
                                                messageAlert={this.state.messageAlert}
                                                handleMessageReset={this.handleMessageReset}
                                                sfAccountType={this.state.sfAccountType}
                                                />} /> 
              <PrivateRoute path={'/lockboxes'} component={props => <LBMenu {...props} 
                                                sfAccountProducts={this.state.sfAccountProducts}
                                                sfAccountType={this.state.sfAccountType} 
                                                handleFormChoice={this.handleFormChoice} 
                                                isFormChosen={this.state.isFormChosen} 
                                                timeBasedGreeting={this.timeBasedGreeting}
                                                isMobileMenuClicked={this.isMobileMenuClicked}
                                                lockboxes={this.state.lockboxes}
                                              />} />; 
              <PrivateRoute path={'/account'} component={props => <Account {...props}
                                                isLoggedIn={this.state.isLoggedIn}
                                                handleRequiredAccountFields={this.handleRequiredAccountFields}
                                              />} />;                              
              <Route exact path="/" render={() => (
                this.state.loggedIn ? (<Redirect to='/lockbox' />) : (
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
