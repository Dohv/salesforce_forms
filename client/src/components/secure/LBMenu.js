import React from 'react';
import { Route } from "react-router-dom";
import { OverlayTrigger, Tooltip, } from 'react-bootstrap'
import Remit from "./Remit";
import eKlik from "./eKlik";
import KlikNPay from './KlikNPay';




const LBMenu = ({match, history, handleFormChoice, timeBasedGreeting, lockboxes, sfAccountProducts}) => {

    const handleFormSelect = (e, product, id) => {
        e.preventDefault();
        const greeting = document.querySelector('.formMenuGreeting');
        greeting.classList.add('displayNone');
        localStorage.setItem("selectedForm", product);
        localStorage.setItem("NewImplementationID", id);
        history.push(`${match.url}/${product}/1`);
      }

    if(lockboxes.length > 0) {
        
    }
        const lbs = lockboxes.map((lockbox) => {
            const array = [];
            const singleLBProducts = lockbox.Product_Type__c.split(';').map((product) => {
                return product.toLowerCase();
            }).sort();

            singleLBProducts.map(element => {
                if(element === 'eklik') {
                    element = 'eKlik';
                    array[0] = element;
                } 
                if(element.indexOf('station') !== -1) {
                    element = 'RemitStation';
                    array[3] = element;
                } 
                if(element.indexOf('whole') !== -1) {
                    element = 'Remit Lockbox';
                    array[2] = element;
                }
                if(element.indexOf('knp') !== -1) {
                    element = 'KlikNPay';
                    array[1] = element;
                }

            })

            for(let i = 0; i <= 3; i++) {
                if(array[i] === undefined) {
                    //use the index to give unique keys
                    array[i] = `continue_${i}`;
                }
                if(array[i] === 'eklik') {
                    array[i] = 'eKlik';
                } 
                if(array[i].indexOf('station') !== -1) {
                    array[i] = 'RemitStation';
                } 
                if(array[i].indexOf('whole') !== -1) {
                    array[i] = 'Remit Lockbox';
                }
                if(array[i].indexOf('knp') !== -1) {
                    array[i] = 'KlikNPay';
                }
            }
            
            const singleLBProducts_div = array.map((element, i, array) => {
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
                    <div className={`lbProductButton-Container ${element}`} key={element}>
                        <div className='lbProductButton' lockbox={lockbox.Id} product={element} onClick={e => handleFormSelect(e, element, lockbox.Id)}>Start <i className="fas fa-caret-right"></i></div>
                    </div>
                )
            })

        return (
                <div className='lockbox-details' key={lockbox.Id}>
                    <div className='lockboxDetailsContainer'>
                        <p className='lockboxName'>{lockbox.Lockbox_Name__c}</p><br/>
                        <p className='lockboxNumber'>Lockbox Number: <strong className='strong'>00000000</strong></p><br/>
                    </div>
                    {singleLBProducts_div}
                </div>
        )
        });

     const lb_products = sfAccountProducts.map(product => {
        return product.toLowerCase();
    }).sort()

    const lb_products_div = lb_products.map(element => {
        let description = '';
        if(element === 'eklik') {
            element = 'eKlik';
            description = 'Eliminate online banking checks by allowing B2B bank transfers to be processed electronically.';;
        } 
        if(element === 'remit station') {
            element = 'RemitStation';
            description = 'Conveniently scan and capture payments from any location.'
        } 
        if(element === 'remit') {
            element = 'Remit Lockbox';
            description = 'Streamline retail and wholesale lockbox processing for financial institutions and businesses.';
        }
        if(element.indexOf('kliknpay') !== -1) {
            element = 'KlikNPay';
            description = 'Quickly and easily present online invoices and allow customers to make payments electronically.';
        }

       return (
        <p className='lockbox-product' key={element}>
            {element}
                <OverlayTrigger
                placement={'top'}
                overlay={
                    <Tooltip className={'tooltip'} id={`tooltip_${element}`}>
                    {description}
                    </Tooltip>
                }
                >
                <i className="fal fa-question-circle"></i>
                </OverlayTrigger>
        </p>
        );
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