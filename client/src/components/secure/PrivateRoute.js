import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authServices from '../../services/authServices';

const PrivateRoute = ({ component: Component , ...rest}) => {
  return (
    <Route {...rest} 
      render={(props) => {
        return (
          authServices.isAuthenticated()
            ? <Component {...props} />
            : <Redirect to={
                {
                 pathname: '/login',
                 state: {target: props.location}
                }
              } />
        )}
      }
    />
  );
}


export default PrivateRoute;