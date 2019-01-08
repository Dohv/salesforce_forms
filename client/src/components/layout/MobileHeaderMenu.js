import React from 'react';
import {Link} from "react-router-dom";

const MobileHeaderMenu = ({ handleAccountChange }) => {
    return (

        <div className='dropdown'>
          <Link className='mobile-home' to={'/forms'} onClick={() => {handleAccountChange()}}>Home</Link> 
          <Link className='mobile-account' to={'/clients'}>Account: {localStorage.getItem('sfAccountName')}</Link> 
          <Link className='mobile-logout' to={'/logout'}>Log out</Link>   
        </div>
    );
};

export default MobileHeaderMenu;