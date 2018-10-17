import React, { Component } from 'react';
import eKlikPage1 from './eKlikFormPages/eKlikPage1';
import eKlikPage2 from './eKlikFormPages/eKlikPage2';
import eKlikPage3 from './eKlikFormPages/eKlikPage3';
import Sidebar from '../layout/Sidebar';
import {Link, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import $ from "jquery";



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
        if(localStorage.getItem('selectedForm')) {
            const buttons = document.querySelectorAll('.chooseFormButton');
            
            buttons.forEach((button) => {
                if(button.id !== localStorage.getItem('selectedForm')) {
                    button.classList.add("mystyle");
                } else {
                    button.classList.add("changeFormMenu")
                }
            })
        }
        //console.log(window.location.pathname[window.location.pathname.length - 1]);
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
        this.setState({
          enterOffset: 100,
          leaveOffset: -100,
        }, () => {})
    } 
    updateClass(num) {
        const listItems = document.querySelectorAll('.eklikList');
          listItems.forEach(div => {
              $(div).removeClass('active lessThan');
             let divNum = parseInt(div.id[div.id.length - 1], 10); 
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
        const nextButton = this.state.currentFormPage === 3 ? '' : <Link className='FFLink next ripple' onClick={() => { this.handleNextFormPage(); this.handleNextRouteChangeAnimation(); window.scrollTo(0, 0); this.updateClass(this.state.currentFormPage + 1) }} to={`${this.props.match.path}/${nextPage}`}>Next</Link>;
        const backButton = this.state.currentFormPage === 1 ? '' : <Link className='FFLink back ripple' onClick={() => { this.handleLastFormPage(); this.handleBackRouteChangeAnimation(); window.scrollTo(0, 0); this.updateClass(this.state.currentFormPage - 1) }} to={`${this.props.match.path}/${lastPage}`}>Back</Link>;
        
        
        return (
            <React.Fragment>
                    {backButton}
                    {nextButton}
                   <Sidebar currentFormPage={this.state.currentFormPage} handleCurrentFormPage={this.handleCurrentFormPage} updateClass={this.updateClass} location={location}/> 
            <AnimatedSwitch
                atEnter={{ offset: this.state.enterOffset }}
                atLeave={{ offset: this.state.leaveOffset }}
                atActive={{ offset: 0 }}
                mapStyles={(styles) => ({
                                transform: `translateX(${styles.offset}%)`,
                            })}
                className='switch-wrapper'
            >
                <Route path={`${this.props.match.path}/1`} component={eKlikPage1}/>
                <Route path={`${this.props.match.path}/2`} component={eKlikPage2}/>
                <Route path={`${this.props.match.path}/3`} component={eKlikPage3}/>
            </AnimatedSwitch>
                


            </React.Fragment>
        );
    }
};

export default EKlik;