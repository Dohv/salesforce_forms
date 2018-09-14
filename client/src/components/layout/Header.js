import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChannelPartner: this.props.sfAccountType === 'Active Channel Partner',
        }

        this.handleAccountChange = this.handleAccountChange.bind(this);
    }

    componentDidMount() {
        const clientList = this.state.isChannelPartner ? <Link  
        className='btn btn-primary header-signout'
        to={'/clients'} 
        > Client List
    </Link> : ''
    this.setState({clientList})
    }

    handleAccountChange() {
        localStorage.setItem('sfAccountId', localStorage.getItem('userAccountId'));
        localStorage.setItem('sfAccountName', localStorage.getItem('userAccountName'));
        localStorage.setItem('sfAccountProducts', localStorage.getItem('userAccountProducts'));
    }

     render() {
            
         return (
             <header className='header'>
                 <Link to={'/forms'} onClick={this.handleAccountChange}><i className="fas fa-home fa-3x"></i></Link>
                 <div className={'header-text'}>CA Onboarding Forms</div>
                 <div className='headerEmail'>{this.props.currentUserEmail}</div>
                     <Link  
                         className='btn btn-primary header-signout'
                         to={'/logout'} 
                         > Sign out
                     </Link>
                    {this.state.clientList}
             </header>
         );

     }
};

export default Header;