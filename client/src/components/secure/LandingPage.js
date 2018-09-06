import React from 'react';
import {Link, Route } from "react-router-dom";
import ProtectedChildHome from "./ProtectedChildHome";
import Remit from "./Remit";
import eKlik from "./eKlik";
import KlikNPay from './KlikNPay';
import ClientList from './ClientList';

const FormMenu = ({match, sfAccountType}) => {
    const leftDivStyle = {
        display: 'inline'
    };

    //const renderFormButtons = sfAccountType === 'Active Chanel Partner' ? <ClientList /> : <
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
                <Route path={`${match.url}/KlikNPay`} component={KlikNPay}/>
                <Route path={`${match.url}`} component={ProtectedChildHome} exact/>

        </div>
    );
};

export default FormMenu;