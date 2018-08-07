import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
    return (
        <div className="home-container">
            <div className="ticket-container">
                <div>
                <h1 className="page-title">Home</h1>
                    <Link to='/login' >Login here<img className="ticket"/></Link>
                </div>
            </div>
        </div>
    );
  }
}

export default Home;