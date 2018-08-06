import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {creds} from './credentials.json';
import { Button } from 'react-bootstrap';

class App extends Component {
  handleClick() {
    console.log('in handleClick function');
  }

  render() {
    return (
      <div className="App">
          <Button onClick={this.handleClick} bsStyle="primary" bsSize="large">Make API call</Button>
      </div>
    );
  }
}

export default App;
