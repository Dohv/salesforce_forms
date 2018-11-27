import React, { Component } from 'react';
import RemitPage1 from './RemitFormPages/RemitPage1';
import Blue from './Blue';
import Red from './Red';
import Sidebar from '../layout/Sidebar';
import {Link, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import $ from "jquery";
import BackButton from '../BackButton';


class Remit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFormPage: 1,
            enterOffset: 100,
            leaveOffset: -100,
        }

        this.handleNextFormPage = this.handleNextFormPage.bind(this);
        this.handleLastFormPage = this.handleLastFormPage.bind(this);
        this.handleBackRouteChangeAnimation = this.handleBackRouteChangeAnimation.bind(this);
        this.handleNextRouteChangeAnimation = this.handleNextRouteChangeAnimation.bind(this);
        this.handleCurrentFormPage = this.handleCurrentFormPage.bind(this);
        this.updateClass = this.updateClass.bind(this);
    }
    
    componentDidMount() {
        const x = document.querySelector('.formButtonContainer'); 
        const y = document.querySelector('.formMenuGreeting');
        if(x && y) {x.classList.add('displayNone'); y.classList.add('displayNone')}
        this.updateClass(parseInt(window.location.pathname[window.location.pathname.length - 1]));
    }

    handleCurrentFormPage(num) {
        this.setState({currentFormPage: num}, () => {})
    }

      handleNextFormPage() {
        let next = this.state.currentFormPage + 1;
        this.setState({ currentFormPage: next, function() {console.log(this.state.currentFormPage)}
      });
        
      }
    
      handleLastFormPage() {
        let last = this.state.currentFormPage - 1;
        this.setState({ currentFormPage: last, });
      }

      handleBackRouteChangeAnimation() {
          this.setState({
            enterOffset: -100,
            leaveOffset: 100,
          }, function() {})
      }

      handleNextRouteChangeAnimation() {
        this.setState({
          enterOffset: 100,
          leaveOffset: -100,
        }, function() {})
    }

    updateClass(num) {
        const listItems = $('.stepLink');
          $.each(listItems, function(i, div) {
              $(div).removeClass('active lessThan');
             let divNum = parseInt(div.id[div.id.length - 1]);
             if(divNum === num) {
                 $(div).addClass('active')
                }
                if(divNum < num) {
                $(div).addClass('lessThan');
            }
          });
      }

    render () {
        let location = parseInt(window.location.pathname[window.location.pathname.length - 1]);
         if(location !== this.state.currentFormPage) {
            this.updateClass(location);
        }

        let nextPage = (this.state.currentFormPage + 1).toString();
        let lastPage = (this.state.currentFormPage - 1).toString();
        const nextButton = this.state.currentFormPage === 3 ? '' : <Link className='FFLink next' onClick={() => { this.handleNextFormPage(); this.handleNextRouteChangeAnimation(); window.scrollTo(0, 0) }} to={`${this.props.match.path}/${nextPage}`}>Next</Link>;
        const backButton = this.state.currentFormPage === 1 ? '' : <Link className='FFLink back' onClick={() => { this.handleLastFormPage(); this.handleBackRouteChangeAnimation(); window.scrollTo(0, 0) }} to={`${this.props.match.path}/${lastPage}`}>Back</Link>;
        
        
        return (
            <React.Fragment>
            <div className='container'>
                        <div className='setup'>
                            Remit Setup
                            {backButton}
                        </div>
                    
                        <Sidebar currentFormPage={this.state.currentFormPage} handleCurrentFormPage={this.handleCurrentFormPage} updateClass={this.updateClass} location={location} /> 
                    
                    </div>
            <AnimatedSwitch
                atEnter={{ offset: this.state.enterOffset }}
                atLeave={{ offset: this.state.leaveOffset }}
                atActive={{ offset: 0 }}
                mapStyles={(styles) => ({
                                transform: `translateX(${styles.offset}%)`,
                            })}
                className='switch-wrapper'
            >
                <Route path={`${this.props.match.path}/1`} component={RemitPage1}/>
                <Route path={`${this.props.match.path}/2`} component={Blue}/>
                <Route path={`${this.props.match.path}/3`} component={Red}/>
            </AnimatedSwitch>
                


            </React.Fragment>
        );
    }
};

export default Remit;