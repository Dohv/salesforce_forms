import React from 'react';
import {Link} from "react-router-dom";

const MobileHeaderMenu = ({ handleAccountChange }) => {
    return (

        <div className='dropdown'>
          <Link className='mobile-home mobile-menu-link' to={'/lockboxes'} onClick={() => {handleAccountChange()}}>Home</Link> 
          <Link className='mobile-account mobile-menu-link' to={'/clients'}>Account: {localStorage.getItem('sfAccountName')}</Link> 
          <Link className='mobile-accountSetup mobile-menu-link' to={'/account'}>Account Setup</Link>  
          <Link className='mobile-logout mobile-menu-link' to={'/logout'}>Log out</Link> 
        </div>
    );
};

export default MobileHeaderMenu;