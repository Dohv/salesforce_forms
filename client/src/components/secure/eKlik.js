import React, { Component } from 'react';
import EKlikPage1 from './eKlikFormPages/eKlikPage1';
import EKlikPage2 from './eKlikFormPages/eKlikPage2';
import EKlikPage3 from './eKlikFormPages/eKlikPage3';
import Sidebar from '../layout/Sidebar';
import {Link, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import $ from "jquery";
// import BackButton from '../BackButton';


class EKlik extends Component {
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
        this.updateClass(parseInt(window.location.pathname[window.location.pathname.length - 1]));
    }

    handleCurrentFormPage(num) {
        this.setState({currentFormPage: num}, () => {})
    }

      handleNextFormPage() {
        let next = this.state.currentFormPage + 1;
        this.setState({ currentFormPage: next
      }, () => {});
        
      }
    
      handleLastFormPage() {
        let last = this.state.currentFormPage - 1;
        this.setState({ currentFormPage: last, });
      }

      handleBackRouteChangeAnimation() {
          this.setState({
            enterOffset: -100,
            leaveOffset: 100,
          }, () => {})
      }

      handleNextRouteChangeAnimation() {
        window.scrollTo(0, 0);
        this.setState({
          enterOffset: 100,
          leaveOffset: -100,
        }, () => {})
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
        const x = document.querySelector('.lockbox-products'); 
        const y = document.querySelector('.lockbox-container');
        const z = document.querySelector('.formMenuGreeting');
        if(x && y) {x.classList.add('displayNone'); y.classList.add('displayNone'); z.classList.add('displayNone');}

        if($('.form')) {
            $(window).resize(function() {
                $('.setup').width($('.form').css('width'));
                $('.setup').css('top', $('.header').css('height'));
            })
        }

        let location = parseInt(window.location.pathname[window.location.pathname.length - 1]);
         if(location !== this.state.currentFormPage) {
            this.updateClass(location);
        }
        
        // let nextPage = (this.state.currentFormPage + 1).toString();
        let lastPage = (this.state.currentFormPage - 1).toString();
        //const nextButton = location === 3 ? '' : <Link className='FFLink next ripple' onClick={() => { this.handleNextFormPage(); this.handleNextRouteChangeAnimation(); window.scrollTo(0, 0); this.updateClass(this.state.currentFormPage + 1) }} to={`${this.props.match.path}/${nextPage}`}>Next</Link>;
        const backButton = location === 1 ? <Link className='FFLink back ripple' to={'/lockboxes'}><i className="fas fa-caret-left"></i>Back</Link> : <Link className='FFLink back ripple' onClick={() => { this.handleLastFormPage(); this.handleBackRouteChangeAnimation(); window.scrollTo(0, 0); this.updateClass(this.state.currentFormPage - 1) }} to={`${this.props.match.path}/${lastPage}`}><i className="fas fa-caret-left"></i>Back</Link>;
        
        
        return (
            <React.Fragment>
                    
                    <div className='container'>
                            <div className='setup'>
                                eKlik Setup
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
                <Route path={`${this.props.match.path}/1`} component={(props) => (<EKlikPage1 {...props} handleNextFormPage={this.handleNextFormPage} updateClass={this.updateClass} handleNextRouteChangeAnimation={this.handleNextRouteChangeAnimation} currentFormPage={this.state.currentFormPage} />)}/>
                <Route path={`${this.props.match.path}/2`} component={(props) => (<EKlikPage2 {...props} handleNextFormPage={this.handleNextFormPage} updateClass={this.updateClass} handleNextRouteChangeAnimation={this.handleNextRouteChangeAnimation} currentFormPage={this.state.currentFormPage} />)}/>
                <Route path={`${this.props.match.path}/3`} component={(props) => (<EKlikPage3 {...props} handleNextFormPage={this.handleNextFormPage} updateClass={this.updateClass} handleNextRouteChangeAnimation={this.handleNextRouteChangeAnimation} currentFormPage={this.state.currentFormPage} />)}/>
            </AnimatedSwitch>
                


            </React.Fragment>
        );
    }
};

export default EKlik;