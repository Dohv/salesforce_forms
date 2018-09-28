import React, { Component } from 'react';
import RemitPage1 from './RemitFormPages/RemitPage1';
import Blue from './Blue';
import Red from './Red';
import {Link, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';



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
    }
    
      handleNextFormPage() {
        console.log('in handleNextFormPage function');
        console.log(this.state.currentFormPage);
        let next = this.state.currentFormPage + 1;
        this.setState({ currentFormPage: next, function() {console.log(this.state.currentFormPage)}
      });
        
      }
    
      handleLastFormPage() {
        console.log('in handleLastFormPage function');
        console.log(this.state.currentFormPage);
    
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

    render () {
        let nextPage = (this.state.currentFormPage + 1).toString();
        let lastPage = (this.state.currentFormPage - 1).toString();
        const nextButton = this.state.currentFormPage === 3 ? '' : <Link className='FFLink' onClick={() => { this.handleNextFormPage(); this.handleNextRouteChangeAnimation() }} to={`${this.props.match.path}/${nextPage}`}>Next</Link>;
        const backButton = this.state.currentFormPage === 1 ? '' : <Link className='FFLink' onClick={() => { this.handleLastFormPage(); this.handleBackRouteChangeAnimation() }} to={`${this.props.match.path}/${lastPage}`}>Back</Link>;
        
        
        return (
            <React.Fragment>

                <h2 className='form-title'>Remit</h2>

                    {backButton}
                    {nextButton}
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