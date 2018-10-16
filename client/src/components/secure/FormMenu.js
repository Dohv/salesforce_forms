import React from 'react';
import {Link, Route } from "react-router-dom";
import ProtectedChildHome from "./ProtectedChildHome";
import Remit from "./Remit";
import eKlik from "./eKlik";
import KlikNPay from './KlikNPay';



const FormMenu = ({match, handleFormChoice}) => {

    const formSelect = (e) => {
        //console.log(e.target.innerHTML);
        localStorage.setItem("selectedForm", e.target.innerHTML);
    };

    let products = (localStorage.getItem('sfAccountProducts').split(';'));
    products = JSON.parse(products)
    if(window.location.pathname === '/forms') {
        const buttons = document.querySelectorAll('.chooseFormButton');
        buttons.forEach((button) => {
          //console.log(button.id);
          if(button.id !== localStorage.getItem('selectedForm')) {
            button.classList.remove("mystyle");
          } else {
            button.classList.remove("changeFormMenu")
          }

        })  
    }
   
    return (
        <div className='formMenu'>
                    <h4 className='formButtonContainer'>
                        {products.map(product => {
                            if(product === 'KlikNPay (Plus)') {
                                product = 'KlikNPay';
                            }
                            return <Link  className='chooseFormButton' id={product} key={product} to={`${match.url}/${product}/1`} onClick={(e) => {formSelect(e); handleFormChoice();}}>{product}</Link>
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