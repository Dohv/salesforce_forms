import React from 'react';
import {Link} from "react-router-dom";
import { Button } from 'react-bootstrap';

const divHide = {
    display: 'none'
};

const divShow = {
    display: 'inline',
    marginLeft: '50px'
};


const Header = (props) => {
    let toggle = props.isLoggedIn ? divShow : divHide;
    
    return (
        <header className='header'>
            <Link to={'/private'}><i className="fas fa-home fa-3x"></i></Link>
            <div className={'header-text'}>CA Onboarding Forms</div>
            
                <Link  
                    style={toggle}
                    className='btn btn-primary'
                    to={'/login'} 
                    onClick={() => props.handleLogOutSubmit()}
                    > Sign out
                </Link>
        </header>
    );
};

export default Header;