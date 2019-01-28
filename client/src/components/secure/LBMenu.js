import React from 'react';
import { Route } from "react-router-dom";
import Remit from "./Remit";
import eKlik from "./eKlik";
import KlikNPay from './KlikNPay';




const LBMenu = ({match, history, handleFormChoice, timeBasedGreeting, lockboxes, sfAccountProducts}) => {

    const handleFormSelect = (e, product, id) => {
        e.preventDefault();
        console.log(e.target);
        const greeting = document.querySelector('.formMenuGreeting');
        greeting.classList.add('displayNone');
        localStorage.setItem("selectedForm", product);
        localStorage.setItem("NewImplementationID", id);
        history.push(`${match.url}/${product}/1`);
      }

    if(lockboxes.length > 0) {
        
    }
        const lbs = lockboxes.map((lockbox) => {
        //console.log(lockbox)
            const singleLBProducts = lockbox.Product_Type__c.split(';').map((product) => {
                return product.toLowerCase();
            }).sort();
            
            const singleLBProducts_div = singleLBProducts.map(element => {
                    if(element === 'eklik') {
                        element = 'eKlik';
                    } 
                    if(element.indexOf('station') !== -1) {
                        element = 'RemitStation';
                    } 
                    if(element.indexOf('whole') !== -1) {
                        element = 'Remit Lockbox';
                    }
                    if(element.indexOf('knp') !== -1) {
                        element = 'KlikNPay';
                    }
            
                    //console.log({element, id: lockbox.Id})
                return (
                    <div className='lbProductButton-Container' key={element}>
                        <p className='formStatus'>Form Status</p>
                        <div className='lbProductButton' lockbox={lockbox.Id} product={element} onClick={e => handleFormSelect(e, element, lockbox.Id)}>Start <i className="fas fa-caret-right"></i></div>
                    </div>
                )
            })

        return (
                <div className='lockbox-details' key={lockbox.Id}>
                    <div className='lockboxDetailsContainer'>
                        <p className='lockboxName'>{lockbox.Lockbox_Name__c} <i className="fal fa-pen"></i></p><br/>
                        <p className='lockboxNumber'>Lockbox Number: <strong className='strong'>TBD</strong></p><br/>
                        <p className='lockboxStatus'>Status: <strong className='strong'>TBD</strong></p>
                    </div>
                    {singleLBProducts_div}
                </div>
        )
        });

     const lb_products = sfAccountProducts.map(product => {
        return product.toLowerCase();
    }).sort()

    const lb_products_div = lb_products.map(element => {
        if(element === 'eklik') {
            element = 'eKlik';
        } 
        if(element === 'remit station') {
            element = 'RemitStation';
        } 
        if(element === 'remit') {
            element = 'Remit Lockbox';
        }
        if(element.indexOf('kliknpay') !== -1) {
            element = 'KlikNPay';
        }

       return <p className='lockbox-product' key={element}>{element}<i className="fal fa-question-circle"></i></p>;
    });

    

    const lockboxContainer = document.querySelector('.lockbox-container');
    const lockboxProductTitles = document.querySelector('.lockbox-products');
    const greeting = document.querySelector('.formMenuGreeting');

    if(match.path === '/lockboxes' &&  lockboxContainer) {
        greeting.classList.remove('displayNone');
        lockboxContainer.classList.remove('displayNone');
        lockboxProductTitles.classList.remove('displayNone');
    }


    return (
      <div className='lbMenu'>
        <div className="formMenuGreeting">
            {timeBasedGreeting()}
            {localStorage.getItem('sfContactName').slice(0, localStorage.getItem('sfContactName').indexOf(' '))}
        </div>

        <div className='lockbox-products'>
            <p className='lockbox-product'></p>
            {lb_products_div}
        </div>
        
        <div className='lockbox-container'> 
            {lbs}
        </div>

        
        <Route path={`${match.url}/Remit`} component={Remit}/>
        <Route path={`${match.url}/eKlik`} component={eKlik}/>
        <Route path={`${match.url}/KlikNPay`} component={KlikNPay}/>
      </div>  
    )
}

export default LBMenu;