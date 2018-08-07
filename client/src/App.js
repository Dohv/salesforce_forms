import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import LogInForm from './components/Login';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      messageAlert: '',
      currentUserId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
      currentUserEmail: localStorage.getItem('email') ? localStorage.getItem('email') : '',
    };

    // Bind functions:
    this.handleClick = this.handleClick.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
  }
  
  async handleSignInSubmit(email, password) {
    try {
     let login = await axios.post('/users/signin', {
        email,
        password
      })
      if (login) {
        console.log(login);
        localStorage.setItem("token", login.data.token);
        localStorage.setItem("user", login.data.email);
        localStorage.setItem("id", login.data.id);

        this.setState({ 
          currentUserId: login.data.id,
          isLoggedIn: true,
          messageAlert: ''
        });
      } else {
        console.log("this is data:", login.data);
        this.setState({ messageAlert: login.data });
      }
    } catch(error) {
      console.log("this is error:", error);
    }
  }


  handleClick() {
    console.log('in handle click function');
    this.handleSignInSubmit();  
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={props => <Home {...props}
                                              currentUserName={this.state.currentUserName}
                                              currentUserId={this.state.currentUserId}
                                               />} />
            <Route path="/login" component={props => <LogInForm {...props}
                                              handleSignInSubmit={this.handleSignInSubmit}
                                             />} />
          
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
