import React, {Component} from 'react';
import {Link} from "react-router-dom";
import MobileHeaderMenu from './MobileHeaderMenu';
import {Image} from 'react-bootstrap';
import home from '../../assets/home_icon@3x.png';
import whiteLogo from '../../assets/checkalt_white@3x.png';
import $ from 'jquery';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChannelPartner: this.props.sfAccountType === 'Active Channel Partner',
            isMenuClicked: false,
        }

        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.removeMenu = this.removeMenu.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.removeMenu, false);
        const clientList = this.state.isChannelPartner ? <Link  
        className='btn btn-primary header-signout'
        to={'/clients'} 
        > Client List
    </Link> : ''
    this.setState({clientList})
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.removeMenu, false);
    }

    handleAccountChange() {
        localStorage.setItem('sfAccountId', localStorage.getItem('userAccountId'));
        localStorage.setItem('sfAccountName', localStorage.getItem('userAccountName'));
        localStorage.setItem('sfAccountProducts', localStorage.getItem('userAccountProducts'));
    }

    toggleClass() {
            $('.hamburgerContainer').toggleClass('xActive');
        //toggle state in React!!
            this.setState(prevState => ({
                isMenuClicked: !prevState.isMenuClicked,
              }));
    }

    removeMenu(event) {
        if(this.node.contains(event.target)) {
            
            return;
        }
        
        this.handleClickOutside();
    }

    handleClickOutside() {
        $('.hamburgerContainer').removeClass('xActive');
        this.setState({
            isMenuClicked: false,
        })
    }


    
    render() {

        const dropDown = this.state.isMenuClicked ? <MobileHeaderMenu handleAccountChange={this.handleAccountChange} /> : '';
        
        return (
             <header className='header' id='navbar' ref={ node => this.node = node }>
                 <div className='header-container'>
                 <div className='headerComp header-comp-left'>
                     <Link to={'/forms'} className='whiteLogoLink'>
                        <Image className='whiteLogo' src={whiteLogo} responsive />
                     </Link>
                        <p className='app-title'>Onboarding Center</p>
                 </div>
                 
                 <div className='headerComp header-comp-right'>
                 <Link className='account-text' to={'/clients'}>Account: {localStorage.getItem('sfAccountName')}</Link>
                    {/* <div className='headerEmail'>{this.props.currentUserEmail}</div> */}
                    <Link className='header-button' to={'/forms'} onClick={() => {this.handleAccountChange()}}><Image className='home' src={home} responsive /></Link>
                    <Link  
                        className='header-signout  header-button'
                        to={'/logout'} 
                        > Log out
                    </Link>
                    <div className='hamburgerContainer' onClick={this.toggleClass}>
                        <div className="hamburger"></div>
                    </div>
                </div>
                {dropDown}
                </div>
             </header>
         );

     }
};

export default Header;