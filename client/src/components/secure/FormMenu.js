import React from 'react';
import {Link, Route } from "react-router-dom";
import ProtectedChildHome from "./ProtectedChildHome";
import Remit from "./Remit";
import eKlik from "./eKlik";
import KlikNPay from './KlikNPay';
import KlikNPay2 from './KlikNPay2';


const Child = ({ match }) => (
    
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );

const FormMenu = ({match, currentFormPage, handleNextFormPage, handleLastFormPage}) => {

    const formSelect = (e) => {
        //console.log(e.target.innerHTML);
        localStorage.setItem("selectedForm", e.target.innerHTML);
        //console.log(localStorage.getItem('selectedForm'));
    };

    const titleStyle = {
        textAlign: 'center',
    }

    let products = (localStorage.getItem('sfAccountProducts').split(';'));
    products = JSON.parse(products)
   
    return (
        <div >
          <h3 style={titleStyle}>{localStorage.getItem('sfAccountName')}</h3>  
        <h4 className='formButtonContainer'>
                {products.map(product => {
                    if(product === 'KlikNPay (Plus)') {
                        product = 'KlikNPay';
                    }
                    return <Link  className='chooseFormButton' key={product} to={`${match.url}/${product}/1`} onClick={formSelect}>{product}</Link>
                })}
            </h4>
            


                <Route path={`${match.url}/Remit`} component={props => <Remit {...props} currentFormPage={currentFormPage} handleNextFormPage={handleNextFormPage} handleLastFormPage={handleLastFormPage}/> }/>
                <Route path={`${match.url}/eKlik`} component={eKlik}/>
                <Route path={`${match.url}/KlikNPay`} component={KlikNPay}/>
                <Route path={`${match.url}/KlikNPay/2`} component={KlikNPay2}/>
                <Route path={`${match.url}`} component={ProtectedChildHome} exact/>

        </div>
    );
};

export default FormMenu;