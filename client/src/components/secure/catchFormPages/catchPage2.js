import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import formDataServices from '../../../services/formDataServices';
import $ from 'jquery';

class Catch2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            isSaving: false,
            eKlik_Bank_Routing_Number: '',
            eKlik_Bank_Account_Number: '',
            Fiserv: '',
            RPPS: '',
            Other_Online_Payment_Processor: '',
            Check_Payment_Name_1: '',
            Check_Payment_Name_2: '',
            Check_Payment_Name_3: '',
            Check_Payment_Name_4: '',
            Check_Payment_Name_5: '',
            Check_Payment_Name_6: '',
            Check_Payment_Name_7: '',
            Check_Payment_Name_8: '',
            Check_Payment_Name_9: '',
            Check_Payment_Name_10: '',
            Remittance_Address_1: '',
            Remittance_Address_2: '',
            Remittance_Address_3: '',
            Remittance_Address_4: '',
            Remittance_Address_5: '',
            Remittance_Address_6: '',
            Remittance_Address_7: '',
            Remittance_Address_8: '',
            Remittance_Address_9: '',
            Remittance_Address_10: '',
            nameInputs: [],
            newName: '',
            addressInputs: [],
            newAddress: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.addNameInputs = this.addNameInputs.bind(this);
        this.addOne = this.addOne.bind(this);
        this.addAddressInputs = this.addAddressInputs.bind(this);
        this.addOneAddress = this.addOneAddress.bind(this);
        this.removeInput = this.removeInput.bind(this);
    }


    _isMounted = false;

    componentDidMount() {
      const x = document.querySelector('.formButtonContainer'); 
        const y = document.querySelector('.formMenuGreeting');
        if(x && y) {x.classList.add('displayNone'); y.classList.add('displayNone')}
        $('.setup').width($('.form').css('width'));
      $('.setup').css('top', $('.header').css('height'));
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
        await formDataServices.updateFormData(localStorage.getItem("Account_Name"), name, value, localStorage.getItem('selectedForm'), localStorage.getItem('NewImplementationID'));
        this.setState({isSaving: false});
    }

    async getFormData() {
        await formDataServices.getFormDataFromServer(localStorage.getItem('sfAccountId'), localStorage.getItem('selectedForm'), localStorage.getItem('NewImplementationID'));
       if(this._isMounted) {
          this.setState({
            eKlik_Bank_Routing_Number: localStorage.getItem("eKlik_Bank_Routing_Number"),
            eKlik_Bank_Account_Number: localStorage.getItem("eKlik_Bank_Account_Number"),
            Fiserv: JSON.parse(localStorage.getItem("Fiserv")),
            RPPS: JSON.parse(localStorage.getItem("RPPS")),
            Other_Online_Payment_Processor: localStorage.getItem("Other_Online_Payment_Processor"),
            Check_Payment_Name_1: localStorage.getItem("Check_Payment_Name_1"),
            Check_Payment_Name_2: localStorage.getItem("Check_Payment_Name_2"),
            Check_Payment_Name_3: localStorage.getItem("Check_Payment_Name_3"),
            Check_Payment_Name_4: localStorage.getItem("Check_Payment_Name_4"),
            Check_Payment_Name_5: localStorage.getItem("Check_Payment_Name_5"),
            Check_Payment_Name_6: localStorage.getItem("Check_Payment_Name_6"),
            Check_Payment_Name_7: localStorage.getItem("Check_Payment_Name_7"),
            Check_Payment_Name_8: localStorage.getItem("Check_Payment_Name_8"),
            Check_Payment_Name_9: localStorage.getItem("Check_Payment_Name_9"),
            Check_Payment_Name_10: localStorage.getItem("Check_Payment_Name_10"),
            Remittance_Address_1: localStorage.getItem("Remittance_Address_1"),
            Remittance_Address_2: localStorage.getItem("Remittance_Address_2"),
            Remittance_Address_3: localStorage.getItem("Remittance_Address_3"),
            Remittance_Address_4: localStorage.getItem("Remittance_Address_4"),
            Remittance_Address_5: localStorage.getItem("Remittance_Address_5"),
            Remittance_Address_6: localStorage.getItem("Remittance_Address_6"),
            Remittance_Address_7: localStorage.getItem("Remittance_Address_7"),
            Remittance_Address_8: localStorage.getItem("Remittance_Address_8"),
            Remittance_Address_9: localStorage.getItem("Remittance_Address_9"),
            Remittance_Address_10: localStorage.getItem("Remittance_Address_10"),
          });
        } 
       this.addNameInputs();
      this.addAddressInputs();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
    }

    _lastInputNameCreated = 1;
    _lastInputAddressCreated = 1;

    addOne(e) {
      e.preventDefault();
      this._lastInputNameCreated = this._lastInputNameCreated + 1;

      if(this._lastInputNameCreated <= 10) {
        let nameValue = `Check_Payment_Name_${this._lastInputNameCreated.toString()}`;
        let labelValue = `Name ${this._lastInputNameCreated.toString()}`;
        let stateValue = this.state[nameValue];
        this.setState({
          nameInputs: [...this.state.nameInputs, 
            <FormGroup key={this.state.nameInputs.length + 1}>
              <Row>
                  <Col xs={12} sm={6} md={6}>
                      <ControlLabel>{labelValue}</ControlLabel>
                      <FormControl 
                        id={labelValue}
                        className='checkname'
                        name={nameValue}
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
    
    addNameInputs() {
      const ten = [2,3,4,5,6,7,8,9,10]
      const result = []
      ten.forEach((el, i) => {
        let nameValue = `Check_Payment_Name_${el.toString()}`;
        let labelValue = `Name ${el.toString()}`;
        let stateValue = this.state[nameValue];
        if(stateValue !== '') {
          this._lastInputNameCreated = el;
          result.push(
            <FormGroup key={this.state.nameInputs.length + 1}>
              <Row>
                  <Col xs={12} sm={6} md={6}>
                      <ControlLabel>{labelValue}</ControlLabel>
                      <FormControl 
                        id={labelValue}
                        className='checkname'
                        name={nameValue}
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

    addOneAddress(e) {
      e.preventDefault();
      this._lastInputAddressCreated = this._lastInputAddressCreated + 1;

      if(this._lastInputAddressCreated <= 10) {
        let addressValue = `Remittance_Address_${this._lastInputAddressCreated.toString()}`;
        let labelValue = `Address ${this._lastInputAddressCreated.toString()}`;
        let stateValue = this.state[addressValue];
        this.setState({
          addressInputs: [...this.state.addressInputs, 
            <FormGroup key={this.state.addressInputs.length + 1}>
              <Row>
                  <Col xs={12} sm={6} md={6}>
                      <ControlLabel>{labelValue}</ControlLabel>
                      <FormControl 
                        id={labelValue}
                        className='checkname'
                        name={addressValue} 
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
    
    addAddressInputs() {
      const ten = [2,3,4,5,6,7,8,9,10]
      const result = []
      ten.forEach((el, i) => {
        let addressValue = `Remittance_Address_${el.toString()}`;
        let labelValue = `Address ${el.toString()}`;
        let stateValue = this.state[addressValue];
        
        if(stateValue !== '') {
          this._lastInputAddressCreated = el;
          result.push(
            <FormGroup key={this.state.addressInputs.length + 1}>
              <Row>
                  <Col xs={12} sm={6} md={6}>
                      <ControlLabel>{labelValue}</ControlLabel>
                      <FormControl 
                        id={labelValue}
                        className='checkname'
                        name={addressValue} 
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

      return this.setState({addressInputs: result});
    }

    

    render() { 

      if(this._lastInputNameCreated >= 10) {
        document.getElementById('addNameButton').classList.add('name');
      }

      if(this._lastInputAddressCreated >= 10) {
        document.getElementById('addNameButton').classList.add('name');
      }
      let newName = this.state.newName;
      let renderNameInputs = this.state.nameInputs;
      let newAddress = this.state.newAddress;
      let renderAddressInputs = this.state.addressInputs;
        let isFiserv = this.state.Fiserv ? true : false;
        let isRPPS = this.state.RPPS ? true : false;
        let savingStatus = this.state.isSaving ? 
        <div className="saving-anime">
            <div className="lds-ripple"><div></div><div></div></div>
            <p>saving</p> 
        </div> : '';

        let nextPage = (this.props.currentFormPage + 1).toString();
        let path = this.props.match.path;
        const currPath = path.slice(0, path.lastIndexOf('/'))
        const nextButton = this.props.currentFormPage === 3 ? '' : <Link className='FFLink next ripple' onClick={() => { console.log({currPath, nextPage}); this.props.handleNextFormPage(); this.props.handleNextRouteChangeAnimation(); window.scrollTo(0, 0); this.props.updateClass(this.props.currentFormPage + 1) }} to={`${currPath}/${nextPage}`}>Next<i className="fas fa-caret-right"></i></Link>;

        return (
            <React.Fragment>
            <div className='behindForm'>
            {savingStatus}
                <div className='container'>
                  <Form className='form' id='eklikform2'>
                        <h4 className='eklik-page-title'>Service Features</h4>
                        <FormGroup>
                               <Row>
                                    <Col xs={6} sm={6} md={6}>
                                        <ControlLabel>Bank Routing Number</ControlLabel>
                                        <NumberFormat 
                                          format="##########" 
                                          mask="#" type="text" 
                                          className='form-control' name='eKlik_Bank_Routing_Number'  
                                          value={this.state.eKlik_Bank_Routing_Number} 
                                          onChange={this.handleInputChange} 
                                          onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col xs={6} sm={6} md={6}>
                                        <ControlLabel>Bank Account Number</ControlLabel>
                                        <NumberFormat
                                          format="##########" 
                                          mask="#" type="text" 
                                          className='form-control' 
                                          name='eKlik_Bank_Account_Number'  
                                          value={this.state.eKlik_Bank_Account_Number} 
                                          onChange={this.handleInputChange} 
                                          onBlur={this.handleSave} />  
                                    </Col>
                               </Row>
                            </FormGroup>
                              <p className='form-comment'>Are You Currently Enrolled Directly With Any of the following Online Payment Processors?</p>
                              <FormGroup>
                                <Row>
                                    <Col xs={6} sm={3} md={3}>
                                        <Checkbox 
                                          name='Fiserv' 
                                          checked={isFiserv} 
                                          onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Fiserv 
                                        </Checkbox>
                                    </Col> 
                                    <Col xs={6} sm={3} md={3}>
                                        <Checkbox 
                                          name='RPPS' 
                                          checked={isRPPS} 
                                          onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            RPPS
                                        </Checkbox>
                                    </Col>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Other</ControlLabel>
                                        <FormControl 
                                          name='Other_Online_Payment_Processor' 
                                          value={this.state.Other_Online_Payment_Processor} 
                                          onChange={this.handleInputChange} 
                                          onBlur={this.handleSave} />
                                    </Col>
                               </Row>
                            </FormGroup>
                            <p className='form-comment'>Indicate All the Possible Names Customers Might Use On a Check Payment to Your Business</p>
                            <FormGroup>
                               <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Name 1</ControlLabel>
                                        <FormControl 
                                          name='Check_Payment_Name_1' 
                                          value={this.state.Check_Payment_Name_1} 
                                          onChange={this.handleInputChange} 
                                          onBlur={this.handleSave} />
                                          
                                    </Col>
                               </Row>
                            </FormGroup> 
                            {renderNameInputs}
                            {newName}
                            <ButtonToolbar>
                              <Button id='addNameButton' bsSize="small" onClick={this.addOne}>
                              <i className="far fa-plus"></i>
                                Add
                              </Button>
                            </ButtonToolbar>
                            <p className='form-comment'>Indicate All the Possible Remittance Addresses Where Customers Might Send Your Payments</p>

                            <FormGroup>
                               <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Address 1</ControlLabel>
                                        <FormControl 
                                          name='Remittance_Address_1' 
                                          value={this.state.Remittance_Address_1} 
                                          onChange={this.handleInputChange} 
                                          onInput={this.handleSave} />
                                          
                                    </Col>
                               </Row>
                            </FormGroup> 
                            {renderAddressInputs}
                            {newAddress}
                            <ButtonToolbar>
                              <Button id='addNameButton' bsSize="small" onClick={this.addOneAddress}>
                              <i className="far fa-plus"></i>
                                Add
                              </Button>
                            </ButtonToolbar>
                            {nextButton}
                        </Form>
                </div>
            </div>
            </React.Fragment>
    )};
}

export default Catch2;