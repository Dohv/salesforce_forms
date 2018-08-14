import React from 'react';
import {Link} from "react-router-dom";


const Header = (props) => {

    return (
        <header className='header'>
            <Link to={'/private'}><i className="fas fa-home fa-3x"></i></Link>
            <div className={'header-text'}>CA Onboarding Forms</div>

                <Link  
                    className='btn btn-primary header-signout'
                    to={'/logout'} 
                    > Sign out
                </Link>

        </header>
    );
};

export default Header;