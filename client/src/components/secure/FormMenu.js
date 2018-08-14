import React from 'react';
import {Link, Route } from "react-router-dom";
import ProtectedChildHome from "./ProtectedChildHome";
import Remit from "./Remit";
import eKlik from "./eKlik";

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


                <Route path={`${match.url}/Remit`} component={Remit}/>
                <Route path={`${match.url}/eKlik`} component={eKlik}/>
                <Route path={`${match.url}`} component={ProtectedChildHome} exact/>

        </div>
    );
};

export default FormMenu;