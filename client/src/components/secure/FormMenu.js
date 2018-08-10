import React from 'react';
import {Link, Route } from "react-router-dom";
import ProtectedChildHome from "./ProtectedChildHome";
import ProtectedChild1 from "./ProtectedChild1";
import ProtectedChild2 from "./ProtectedChild2";

const FormMenu = ({match}) => {
    const leftDivStyle = {
        display: 'inline'
    };
    return (
        <div style={leftDivStyle}>
            

            <h4>
                <Link to={`${match.url}/1`}>Form 1</Link>
                {' | '}
                <Link to={`${match.url}/2`}>Form 2</Link>
            </h4>


                <Route path={`${match.url}/1`} component={ProtectedChild1}/>
                <Route path={`${match.url}/2`} component={ProtectedChild2}/>
                <Route path={`${match.url}`} component={ProtectedChildHome} exact/>



            <Link className='btn btn-primary' to={'/logout'}>Sign Out</Link>

        </div>
    );
};

export default FormMenu;