import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox, Button, ButtonToolbar } from 'react-bootstrap';
import formDataServices from '../../../services/formDataServices';
import $ from 'jquery';


class eKlik3 extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isLoggedIn: this.props.isLoggedIn,
            isSaving: false,
            Mask_1: '',
            Mask_2: '',
            Mask_3: '',
            Mask_4: '',
            Mask_5: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.addOne = this.addOne.bind(this);
        this.addMaskInputs = this.addMaskInputs.bind(this);
    }

    _isMounted = false;

    componentDidMount() {
        const x = document.querySelector('.formButtonContainer'); 
        const y = document.querySelector('.formMenuGreeting');
        if(x && y) {x.classList.add('displayNone'); y.classList.add('displayNone')} 
        this._isMounted = true;
        this.getFormData();
    }

    componentWillMount() {
        this._isMounted = false;
    }

    async handleSave(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({isSaving: true});
        await formDataServices.updateFormData(localStorage.getItem("Account_Name"), name, value, localStorage.getItem('selectedForm'));
        this.setState({isSaving: false});
    }

    async getFormData() {
        await formDataServices.getFormDataFromServer(localStorage.getItem('sfAccountId'), localStorage.getItem('selectedForm'));
        if(this._isMounted) {
            this.setState({
            Mask_1: localStorage.getItem("Mask_1"),
            Mask_2: localStorage.getItem("Mask_1"),
            Mask_3: localStorage.getItem("Mask_1"),
            Mask_4: localStorage.getItem("Mask_1"),
            Mask_5: localStorage.getItem("Mask_1"),
            newMask: '',
            maskInputs: [],
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
    }

    _lastInputMaskCreated = 1;

    addOne(e) {
      e.preventDefault();
      this._lastInputMaskCreated = this._lastInputMaskCreated + 1;

      if(this._lastInputMaskCreated <= 10) {
        let maskValue = `Mask_${this._lastInputMaskCreated.toString()}`;
        let labelValue = `Accout Mask ${this._lastInputMaskCreated.toString()}`;
        let stateValue = this.state[maskValue];
        this.setState({
          maskInputs: [...this.state.maskInputs, 
            <FormGroup key={this.state.maskInputs.length + 1}>
              <Row>
                  <Col xs={12} sm={6} md={6}>
                      <ControlLabel>{labelValue}</ControlLabel>
                      <FormControl 
                        id={labelValue}
                        className='checkname'
                        name={maskValue}
                        defaultValue={stateValue} 
                        onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                        <i className="fal fa-times" onClick={() => {this.removeInput(document.getElementById(labelValue))}}></i>
                  </Col>
              </Row>
          </FormGroup>   
          ]
        })
      } 
    }
    
    addMaskInputs() {
      const ten = [2,3,4,5,6,7,8,9,10]
      const result = []
      ten.forEach((el, i) => {
        let maskValue = `Mask_${el.toString()}`;
        let labelValue = `Account Mask ${el.toString()}`;
        let stateValue = this.state[maskValue];
        if(stateValue !== '') {
          this._lastInputMaskCreated = el;
          result.push(
            <FormGroup key={this.state.nameInputs.length + 1}>
              <Row>
                  <Col xs={12} sm={6} md={6}>
                      <ControlLabel>{labelValue}</ControlLabel>
                      <FormControl 
                        id={labelValue}
                        className='checkname'
                        name={maskValue}
                        defaultValue={stateValue} 
                        onChange={(e) => {this.handleInputChange(e)}}
                        onInput={(e) => this.handleSave(e)} />
                        <i className="fal fa-times" onClick={() => {this.removeInput(document.getElementById(labelValue))}}></i>
                  </Col>
              </Row>
          </FormGroup>
          )
        }
      })

      return this.setState({nameInputs: result});
    }

    async removeInput(div) {
      div.value = '';
      div.parentNode.remove();
      this.setState({isSaving: true});
      await formDataServices.updateFormData(localStorage.getItem("Account_Name"), div.name, div.value, localStorage.getItem('selectedForm'));
      this.setState({isSaving: false});
    }

    render() {

        $('.setup').width($('.form').css('width'));
        $('.setup').css('top', $('.header').css('height'));

        if(this._lastInputMaskCreated >= 10) {
            document.getElementById('addNameButton').classList.add('name');
          }
          let newMask = this.state.newMask;
          let renderMaskInputs = this.state.maskInputs;

        let savingStatus = this.state.isSaving ? 
        <div className="saving-anime">
            <div className="lds-ripple"><div></div><div></div></div>
            <p>saving</p> 
        </div> : '';


        return (
            <React.Fragment>
            <div className='behindForm'>
            {savingStatus}
                <div className='container'>
                        <Form className='form'>
                          <h4 className='eklik-page-title'>Account Masking (optional but strongly suggested)</h4>
                        
                          <p className='eklik3-comment'>The Account Mask is the structure of the account numbers consumers might see on their statements or invoices. Please describe the structure using the definitions below. You can add as many account masks as neccesary.</p>
                
                            <div className="instructions-container">
                            
                            <p className='instruction'>* = Uppercase Letters</p>
                            
                            <p className='instruction'># = Numeric</p>
                            
                            <p className='instruction'>@ = Uppercase Letters or Numeric</p>
                            
                            <p className='instruction'>! = Special Characters, Upper & Lowercase Alpha or Numeric</p>

                            <p className='eklik3-comment'>For example: If your account number structure starts with "B3A" followed by an uppercase letter and ends with 8 digits then the account mask will be "B3A*########" </p>
                            </div>

                            <FormGroup>
                               <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Account Mask 1</ControlLabel>
                                        <FormControl 
                                          name='Mask_1' 
                                          value={this.state.Mask_1} 
                                          onChange={this.handleInputChange} 
                                          onBlur={this.handleSave} />
                                          
                                    </Col>
                               </Row>
                            </FormGroup> 
                            {renderMaskInputs}
                            {newMask}
                            <ButtonToolbar>
                              <Button id='addNameButton' bsSize="small" onClick={this.addOne}>
                              <i className="far fa-plus"></i>
                                Add
                              </Button>
                            </ButtonToolbar>
                            
                        </Form>
                    </div>
            </div>
            </React.Fragment>
    )};
}

export default eKlik3;
                    

                              
                                  
                  
                          