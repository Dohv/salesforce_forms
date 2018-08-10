import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {

  render() {
    const isAuthenticated = this.props.isAuthenticated();
        return (
            <div>
                { !isAuthenticated ? <Redirect to={{
                      pathname: '/login'
                  }} /> : (
                            <div className="home-container">
                                    <h1 className="page-title">Home</h1>
                            </div>
                          )
                }  
            </div>      
        )
  }
}

export default Home;