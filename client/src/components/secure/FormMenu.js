import React from 'react';
import {Link, Route } from "react-router-dom";
import {Row, Col, Thumbnail, Button} from 'react-bootstrap'
import thumbnaildiv from '../../assets/thumbnaildiv.png'
import eklikThumbnail from '../../assets/eklik@3x.png';
import remitThumbnail from '../../assets/remit@3x.png';
import knpThumbnail from '../../assets/knp@3x.png';
import remitStationThumbnail from '../../assets/remitstation@3x.png';
import ProtectedChildHome from "./ProtectedChildHome";
import Remit from "./Remit";
import eKlik from "./eKlik";
import KlikNPay from './KlikNPay';



const FormMenu = ({match, handleFormChoice, timeBasedGreeting}) => {


    const formSelect = (product) => {
        //console.log(e.target.innerHTML);
        localStorage.setItem("selectedForm", product);
        document.querySelector('.formMenu').classList.add('displayNone');
        
    };

    let products = (localStorage.getItem('sfAccountProducts').split(';'));
    products = JSON.parse(products);
    const element = document.querySelector('.formButtonContainer');
    if(match.path === '/forms' &&  element) {
        
        
        element.classList.remove('displayNone');
        
    }
   
    return (
        <div className='formMenu'>
                    <div className="formMenuGreeting">
                        {timeBasedGreeting()}
                        {localStorage.getItem('sfContactName').slice(0, localStorage.getItem('sfContactName').indexOf(' '))}
                    </div>
                    <div className='formButtonContainer'>
                        {products.map((product, i) => {
                            let img = '';
                            let description = '';

                            if(product === 'KlikNPay (Plus)') {
                                product = 'KlikNPay';
                            }

                            switch(product) {
                                case 'eKlik':
                                    img = eklikThumbnail;
                                    description = 'Eliminate online banking checks by allowing B2B bank transfers to be processed electronically.';
                                    break;
                                case 'Remit':
                                    img = remitThumbnail;
                                    description = 'Streamline retail and wholesale lockbox processing for financial institutions and businesses.';
                                    break;
                                case 'KlikNPay':
                                    img = knpThumbnail;
                                    description = 'Quickly and easily present online invoices and allow customers to make payments electronically.';
                                    break;
                                case 'Remit Station':
                                    img = remitStationThumbnail;
                                    description = 'Conveniently scan and capture payments from any location.'
                                    break;
                                default:
                                    img = thumbnaildiv;
                                    description = '';
                            }
                            return (
                                <Col xs={6} md={4} key={i} className='formMenuColumn' >
                                    <Link className='formButtonLink' to={`${match.url}/${product}/1`}  onClick={(e) => {formSelect(product); handleFormChoice();}}>
                                        <Thumbnail src={img} alt="242x200" >
                                            <p className='fb_title'>{product}</p>
                                            <p className='fb_description'>{description}</p>
                                            <p className='startHereContainer'>
                                                <Button className={`startHereButton login-button ${product}`}>Start here<i className="fas fa-caret-right"></i></Button>
                                            </p>
                                        </Thumbnail>
                                    </Link>
                                </Col>)
                        })}
                    </div>
            
                    

                <Route path={`${match.url}/Remit`} component={Remit}/>
                <Route path={`${match.url}/eKlik`} component={eKlik}/>
                <Route path={`${match.url}/KlikNPay`} component={KlikNPay}/>
                {/* <Route path={`${match.url}`} component={ProtectedChildHome} exact/> */}

        </div>
    );
};

export default FormMenu;