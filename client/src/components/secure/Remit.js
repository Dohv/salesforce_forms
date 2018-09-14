import React from 'react';
import KlikNPay from './KlikNPay';
import KlikNPay2 from './KlikNPay2';
import {Link, Route } from "react-router-dom";
import { Button } from 'react-materialize';


const Remit = ({match, currentFormPage, handleNextFormPage, handleLastFormPage}) => {
    currentFormPage = currentFormPage.toString();
    console.log(currentFormPage);
    return (
        <React.Fragment>

            <h2>Protected Component 1</h2>

            <Button className='formFlow' onClick={handleLastFormPage} to={`${match.path}/${currentFormPage}`}>
                    Back
            </Button>
            <Button className='formFlow'>
                <Link className='FFLink' onClick={handleNextFormPage} to={`${match.path}/${currentFormPage}`}>Next</Link>
            </Button>
            <Route path={`${match.path}/1`} component={KlikNPay}/>
            <Route path={`${match.path}/2`} component={KlikNPay2}/>
            <Route path={`${match.path}/3`} component={KlikNPay}/>


        </React.Fragment>
    );
};

export default Remit;