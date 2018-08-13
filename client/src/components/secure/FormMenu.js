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
            

            <h4 className='formButtonContainer'>
                <Link className='chooseFormButton' to={`${match.url}/Remit`}>Remit</Link>
                <Link className='chooseFormButton' to={`${match.url}/eKlik`}>eKlik</Link>
                <Link className='chooseFormButton' to={`${match.url}/KlikNPay`}>KlikNPay</Link>
                <Link className='chooseFormButton' to={`${match.url}/Print-Services`}>Print Services</Link>
                <Link className='chooseFormButton' to={`${match.url}/Remit-Station`}>Remit Station</Link>
            </h4>


                <Route path={`${match.url}/1`} component={ProtectedChild1}/>
                <Route path={`${match.url}/2`} component={ProtectedChild2}/>
                <Route path={`${match.url}`} component={ProtectedChildHome} exact/>



            <Link className='btn btn-primary' to={'/logout'}>Sign Out</Link>

        </div>
    );
};

export default FormMenu;