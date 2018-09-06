import React from 'react';
import {Link, Route } from "react-router-dom";
import ProtectedChildHome from "./ProtectedChildHome";
import Remit from "./Remit";
import eKlik from "./eKlik";
import KlikNPay from './KlikNPay';


const FormMenu = ({match, accountName}) => {

    const formSelect = (e) => {
        //console.log(e.target.innerHTML);
        localStorage.setItem("selectedForm", e.target.innerHTML);
        //console.log(localStorage.getItem('selectedForm'));
    };

    const titleStyle = {
        textAlign: 'center',
    }

    const products = JSON.parse(localStorage.getItem('sfAccountProducts'));
    return (
        <div >
          <h3 style={titleStyle}>{localStorage.getItem("selectedForm")} Form For -company name-</h3>  
        <h4 className='formButtonContainer'>
                {products.map(product => {
                    if(product === 'KlikNPay (Plus)') {
                        product = 'KlikNPay';
                    }
                    return <Link  className='chooseFormButton' key={product} to={`${match.url}/${product}`} onClick={formSelect}>{product}</Link>
                })}
            </h4>
            


                <Route path={`${match.url}/Remit`} component={Remit}/>
                <Route path={`${match.url}/eKlik`} component={eKlik}/>
                <Route path={`${match.url}/KlikNPay`} component={KlikNPay}/>
                <Route path={`${match.url}`} component={ProtectedChildHome} exact/>

        </div>
    );
};

export default FormMenu;