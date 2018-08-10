import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authServices from '../../services/authServices';

const PrivateRoute = ({ component: Component , ...rest}) => (
  <Route {...rest} 
    render={(props) => (
      authServices.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={
            {
              pathname: '/login',
              state: { target: props.location }
            }
        } />
    )}
  />
);

export default PrivateRoute;