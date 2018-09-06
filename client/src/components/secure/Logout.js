import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';  

class Logout extends Component {

  componentWillMount() {
    this.props.handleLogOutSubmit();
  }

  render() {
    return (
        <Redirect to={'/login'} />
    );
  }
}

export default Logout;