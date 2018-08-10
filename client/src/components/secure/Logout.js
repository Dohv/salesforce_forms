import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';  
import authServices from '../../services/authServices';

class Logout extends Component {

  componentDidMount() {
    this.props.handleLogOutSubmit();
  }

  render() {
    return (
        <Redirect to={'/login'} />
    );
  }
}

export default Logout;