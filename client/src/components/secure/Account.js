import React, { Component } from 'react';
import BackButton from '../BackButton';
import $ from 'jquery';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, HelpBlock, OverlayTrigger, Tooltip, ButtonToolbar, Button } from 'react-bootstrap';
import {Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import accountDataServices from '../../services/accountDataServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FI_Name: '',
            FI_Name_error: null,
            FI_Contact_Title: '',
            FI_Contact_Title_error: null,
            FI_Contact_Name: '',
            FI_Contact_Name_error: null,
            FI_Contact_Phone: '',
            FI_Contact_Phone_error: null,
            FI_Contact_Phone_Ext: '',
            FI_Contact_Email: '',
            FI_Contact_Email_error: null,
            Primary_Contact: '',
            Primary_Contact_error: null,
            Primary_Email: '',
            Primary_Email_error: null,
            Name: '',
            Name_error: null,
            Phone: '',
            Phone_error: null,
            Primary_Phone_Ext: '',
            Website: '',
            Website_error: null,
            Company_Address_Street: '',
            Company_Address_Street_error: null,
            Company_Address_City: '',
            Company_Address_City_error: null,
            Company_Address_State: '',
            Company_Address_State_error: null,
            Company_Address_Zip: '',
            Company_Address_Zip_error: null,
            AccountNumber: '',
            Deposit_Account_Number: '',
            Account_Receivables_Software_Name: '',
            Account_Receivables_Software_Name_error: null,
            Software_Version: '',
            EIN_TIN: '',
            EIN_TIN_error: null,
            Volume: '',
            Average_Day: '',
            Peak_Day: '',
            Peak_Day_error: null,
            Web_Access: localStorage.getItem("Web_Access") ? localStorage.getItem("Web_Access") : false,
            Web_Access_Admin_Name_1: '',
            Web_Access_Admin_Name_1_error: null,
            Web_Access_Admin_Name_2: '',
            Web_Access_Admin_Name_2: '',
            Web_Access_Admin_Email_1: '',
            Web_Access_Admin_Email_1_error: null,
            Web_Access_Admin_Email_2: '',
            Web_Access_Admin_Email_3: '',
            Web_Access_Admin_Phone_1: '',
            Web_Access_Admin_Phone_1_error: null,
            Web_Access_Admin_Phone_2: '',
            Web_Access_Admin_Phone_3: '',
            Web_Access_Admin_Phone_Ext_1: '',
            Web_Access_Admin_Phone_Ext_2: '',
            Web_Access_Admin_Phone_Ext_3: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getAccountData = this.getAccountData.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.addOne = this.addOne.bind(this);
        this.addWebAccessInputs = this.addWebAccessInputs.bind(this);
    }

    componentDidMount() {
        $('.setup').width($('.accountForm').css('width'));
        $('.setup').css('top', $('.header').css('height'));
        this._isMounted = true;
        this.getAccountData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _isMounted = false;

    async getAccountData() {
        await accountDataServices.getAccountDataFromServer(localStorage.getItem('sfAccountId'))
        if(this._isMounted) {
            this.setState({
                FI_Name: localStorage.getItem('FI_Name'),
                FI_Contact_Name: localStorage.getItem('FI_Contact_Name'),
                FI_Contact_Email: localStorage.getItem('FI_Contact_Email'),
                FI_Contact_Phone: localStorage.getItem('FI_Contact_Phone'),
                FI_Contact_Phone_Ext: localStorage.getItem('FI_Contact_Phone_Ext'),
                Primary_Contact: localStorage.getItem('Primary_Contact'),
                Primary_Email: localStorage.getItem('Primary_Email'),
                Name: localStorage.getItem('Name'),
                Phone: localStorage.getItem('Phone'),
                Primary_Phone_Ext: localStorage.getItem('Primary_Phone_Ext'),
                Website: localStorage.getItem('Website'),
                Company_Address_Street: localStorage.getItem('Company_Address_Street'),
                Company_Address_City: localStorage.getItem('Company_Address_City'),
                Company_Address_State: localStorage.getItem('Company_Address_State'),
                Company_Address_Zip: localStorage.getItem('Company_Address_Zip'),
                AccountNumber: localStorage.getItem('AccountNumber'),
                Deposit_Account_Number: localStorage.getItem('Deposit_Account_Number'),
                Account_Receivables_Software_Name: localStorage.getItem('Account_Receivables_Software_Name'),
                Software_Version: localStorage.getItem('Software_Version'),
                EIN_TIN: localStorage.getItem('EIN_TIN'),
                Volume: localStorage.getItem('Volume'),
                Average_Day: localStorage.getItem('Average_Day'),
                Peak_Day: localStorage.getItem('Peak_Day'),
                Web_Access: JSON.parse(localStorage.getItem('Web_Access')),
                Web_Access_Admin_Name_1: localStorage.getItem('Web_Access_Admin_Name_1'),
                Web_Access_Admin_Name_2: localStorage.getItem('Web_Access_Admin_Name_2'),
                Web_Access_Admin_Name_3: localStorage.getItem('Web_Access_Admin_Name_3'),
                Web_Access_Admin_Email_1: localStorage.getItem('Web_Access_Admin_Email_1'),
                Web_Access_Admin_Email_2: localStorage.getItem('Web_Access_Admin_Email_2'),
                Web_Access_Admin_Email_3: localStorage.getItem('Web_Access_Admin_Email_3'),
                Web_Access_Admin_Phone_1: localStorage.getItem('Web_Access_Admin_Phone_1'),
                Web_Access_Admin_Phone_2: localStorage.getItem('Web_Access_Admin_Phone_2'),
                Web_Access_Admin_Phone_3: localStorage.getItem('Web_Access_Admin_Phone_3'),
                Web_Access_Admin_Phone_Ext_1: localStorage.getItem('Web_Access_Admin_Phone_Ext_1'),
                Web_Access_Admin_Phone_Ext_2: localStorage.getItem('Web_Access_Admin_Phone_Ext_2'),
                Web_Access_Admin_Phone_Ext_3: localStorage.getItem('Web_Access_Admin_Phone_Ext_3'),
                newWebAccessAdmin: '',
                webAccessInputs: [],
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
      
    validate(e) {
        if(e.target.value === '' || e.target.value === null) {
             this.setState({
                 [`${e.target.name}_error`]: 'error',
             }, () => {})
         } else {
             this.setState({
                 [`${e.target.name}_error`]: null,
             }, () => {})
         }
     }
      
      async handleSave(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        await accountDataServices.updateAccountData(localStorage.getItem("sfAccountId"), name, value);
      }

      validateFields() {
        var counter = 0;
        const fields = ['FI_Name', 'FI_Contact_Name', 'FI_Contact_Title', 'FI_Contact_Phone', 'FI_Contact_Email', 'Primary_Contact', 'Primary_Email', 'Name', 'Phone', 'Website', 'EIN_TIN', 'Company_Address_Street', 'Company_Address_City', 'Company_Address_State', 'Company_Address_Zip', 'Account_Receivables_Software_Name', 'Peak_Day', 'Web_Access_Admin_Name_1', 'Web_Access_Admin_Email_1', 'Web_Access_Admin_Phone_1'];
        
        fields.forEach(field => {
            if(this.state[field] === '') {
                counter++
                this.setState({
                   [`${field}_error`]: 'error',
                })
            }
        });

        if(counter > 0) {
           this.notify();
        } else {
            this.props.handleRequiredAccountFields();
            this.props.history.push('/lockboxes'); 
        }
    }

    notify = () => toast.error('You still have incomplete fields', {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast', 
    });

    _lastWebAccessAdminCreated = 1;

    addOne(e) {
        console.log('in addOne()')
      e.preventDefault();
      this._lastWebAccessAdminCreated = this._lastWebAccessAdminCreated + 1;

      if(this._lastWebAccessAdminCreated <= 3) {
        let name = `Web_Access_Admin_Name_${this._lastWebAccessAdminCreated.toString()}`;
        let email = `Web_Access_Admin_Email_${this._lastWebAccessAdminCreated.toString()}`;
        let phone = `Web_Access_Admin_Phone_${this._lastWebAccessAdminCreated.toString()}`;
        let ext = `Web_Access_Admin_Phone_Ext_${this._lastWebAccessAdminCreated.toString()}`;
        let nameLabel = `Web Admin ${this._lastWebAccessAdminCreated.toString()} Name`;
        let emailLabel = `Web Admin ${this._lastWebAccessAdminCreated.toString()} Email`;
        let phoneLabel = `Web Admin ${this._lastWebAccessAdminCreated.toString()} Phone`;
        let extLabel = 'Ext.';
        let stateNameValue = this.state[name];
        let stateEmailValue = this.state[email];
        let statePhoneValue = this.state[phone];
        let stateExtValue = this.state[ext];
        this.setState({
            webAccessInputs: [...this.state.webAccessInputs, 
            <FormGroup key={this.state.webAccessInputs.length + 1}>
              <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>{nameLabel}</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name={name} 
                                        value={stateNameValue} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e);}}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>{emailLabel}</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name={email} 
                                        value={stateEmailValue} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e);}}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} sm={4} md={4}>
                                <ControlLabel>{phoneLabel}</ControlLabel>
                                <FormGroup validationState={this.state.Web_Access_Admin_Phone_1_error}>
                                        <NumberFormat 
                                            format="(###) ###-####" 
                                            mask="_" className='form-control' 
                                            name={phone} 
                                            value={statePhoneValue} 
                                            onChange={this.handleInputChange} 
                                            onBlur={(e) => {this.handleSave(e);}} /> 
                                </FormGroup>
                            </Col>
                            <Col xs={4} sm={2} md={2}>
                            <ControlLabel>Ext.</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name={extLabel} 
                                        value={stateExtValue} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e);}} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
          </FormGroup>   
          ]
        })
      } 
    }
    
    addWebAccessInputs() {
      const three = [2,3]
      const result = []
      three.forEach((el, i) => {
        let name = `Web_Access_Admin_Name_${this._lastWebAccessAdminCreated.toString()}`;
        let email = `Web_Access_Admin_Email_${this._lastWebAccessAdminCreated.toString()}`;
        let phone = `Web_Access_Admin_Phone_${this._lastWebAccessAdminCreated.toString()}`;
        let ext = `Web_Access_Admin_Phone_Ext_${this._lastWebAccessAdminCreated.toString()}`;
        let nameLabel = `Web Admin ${this._lastWebAccessAdminCreated.toString()} Name`;
        let emailLabel = `Web Admin ${this._lastWebAccessAdminCreated.toString()} Email`;
        let phoneLabel = `Web Admin ${this._lastWebAccessAdminCreated.toString()} Phone`;
        let extLabel = 'Ext.';
        let stateNameValue = this.state[name];
        let stateEmailValue = this.state[email];
        let statePhoneValue = this.state[phone];
        let stateExtValue = this.state[ext];
        if(stateNameValue !== '' && stateEmailValue !== '' && statePhoneValue !== '' && stateExtValue !== '') {
          this._lastWebAccessAdminCreated = el;
          result.push(
            <FormGroup key={this.state.webAccessInputs.length + 1}>
              <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>{nameLabel}</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name={name} 
                                        value={stateNameValue} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e);}}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>{emailLabel}</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name={email} 
                                        value={stateEmailValue} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e);}}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} sm={4} md={4}>
                                <ControlLabel>{phoneLabel}</ControlLabel>
                                <FormGroup validationState={this.state.Web_Access_Admin_Phone_1_error}>
                                        <NumberFormat 
                                            format="(###) ###-####" 
                                            mask="_" className='form-control' 
                                            name={phone} 
                                            value={statePhoneValue} 
                                            onChange={this.handleInputChange} 
                                            onBlur={(e) => {this.handleSave(e);}} /> 
                                </FormGroup>
                            </Col>
                            <Col xs={4} sm={2} md={2}>
                            <ControlLabel>Ext.</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name={extLabel} 
                                        value={stateExtValue} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e);}} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
          </FormGroup> 
          )
        }
      })

      return this.setState({nameInputs: result});
    }


    render() {
        let isWeb_Access = this.state.Web_Access ? true : false;
        if($('.accountForm')) {
            $(window).resize(function() {
                $('.setup').width($('.accountForm').css('width'));
                $('.setup').css('top', $('.header').css('height'));
            })
        }

        let newWebAdmin = this.state.newWebAccessAdmin;
        let renderWebAdminInputs = this.state.webAccessInputs;
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='setup account-title'>Account </div>
                    <Form className='form accountForm'>
                        <h2 className='account-FIrep-section-title'>Financial Institution Representative</h2>
                        <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Financial Institution Name</ControlLabel>
                                <FormGroup validationState={this.state.FI_Name_error}>
                                    <FormControl 
                                        name='FI_Name' 
                                        value={this.state.FI_Name} 
                                        onChange={this.handleInputChange} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Contact Name</ControlLabel>
                                <FormGroup validationState={this.state.FI_Contact_Name_error}>
                                    <FormControl 
                                        name='FI_Contact_Name' 
                                        value={this.state.FI_Contact_Name} 
                                        onChange={this.handleInputChange} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} />   
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Contact Title</ControlLabel>
                                <FormGroup validationState={this.state.FI_Contact_Title_error}>
                                    <FormControl 
                                        name='FI_Contact_Title' 
                                        value={this.state.FI_Contact_Title} 
                                        onChange={this.handleInputChange} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={8} sm={4} md={4}>
                                <ControlLabel>Contact Phone</ControlLabel>
                                <FormGroup validationState={this.state.FI_Contact_Phone_error}>
                                        <NumberFormat 
                                            format="(###) ###-####" 
                                            mask="_" className='form-control' 
                                            name='FI_Contact_Phone' 
                                            value={this.state.FI_Contact_Phone} 
                                            onChange={this.handleInputChange} 
                                            onBlur={(e) => {this.handleSave(e); this.validate(e)}} /> 
                                        <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={4} sm={2} md={2}>
                                <ControlLabel>Ext.</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name='FI_Contact_Phone_Ext' 
                                        value={this.state.FI_Contact_Phone_Ext} 
                                        onChange={this.handleInputChange} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Contact Email</ControlLabel>
                                <FormGroup validationState={this.state.FI_Contact_Email_error}>
                                    <FormControl 
                                        name='FI_Contact_Email' 
                                        value={this.state.FI_Contact_Email} 
                                        onChange={this.handleInputChange} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>

                        <h2 className='account-section-title'>Company Info</h2>

                        <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Company Name</ControlLabel>
                                <FormGroup validationState={this.state.Name_error}>
                                    <FormControl 
                                        name='Name' 
                                        value={this.state.Name} 
                                        readOnly
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Contact Name</ControlLabel>
                                <FormGroup validationState={this.state.Primary_Contact_error}>
                                    <FormControl 
                                        name='Primary Contact' 
                                        value={this.state.Primary_Contact} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} sm={4} md={4}>
                                <ControlLabel>Contact Phone</ControlLabel>
                                <FormGroup validationState={this.state.Phone_error}>
                                        <NumberFormat 
                                            format="(###) ###-####" 
                                            mask="_" className='form-control' 
                                            name='Phone' 
                                            value={this.state.Phone} 
                                            onChange={this.handleInputChange} 
                                            onBlur={(e) => {this.handleSave(e); this.validate(e)}} /> 
                                        <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={4} sm={2} md={2}>
                            <ControlLabel>Ext.</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name='Primary_Phone_Ext' 
                                        value={this.state.Primary_Phone_Ext} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Contact Email</ControlLabel>
                                <FormGroup validationState={this.state.Primary_Email_error}>
                                    <FormControl 
                                        name='Primary_Email' 
                                        value={this.state.Primary_Email} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={5}>
                            <ControlLabel>Address</ControlLabel>
                                <FormGroup validationState={this.state.Company_Address_Street_error}>
                                    <FormControl 
                                        name='Company_Address_Street' 
                                        value={this.state.Company_Address_Street} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                            <ControlLabel>City</ControlLabel>
                                <FormGroup validationState={this.state.Company_Address_City_error}>
                                    <FormControl 
                                        name='Company_Address_City' 
                                        value={this.state.Company_Address_City} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={2}>
                            <ControlLabel>State</ControlLabel>
                                <FormGroup validationState={this.state.Company_Address_State_error}>
                                    <FormControl 
                                        name='Company_Address_State' 
                                        value={this.state.Company_Address_State} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={2}>
                            <ControlLabel>Zip Code</ControlLabel>
                                <FormGroup validationState={this.state.Company_Address_Zip_error}>
                                    <FormControl 
                                        name='Company_Address_Zip' 
                                        value={this.state.Company_Address_Zip} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Company Website</ControlLabel>
                                <FormGroup validationState={this.state.Website_error}>
                                    <FormControl 
                                        name='Website' 
                                        value={this.state.Website} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>

                        <h2 className='account-section-title'>Billing Info</h2>

                        <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Billing Account Number</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name='AccountNumber' 
                                        value={this.state.AccountNumber} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Deposit Account Number (if different)</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name='Deposit_Account_Number' 
                                        value={this.state.Deposit_Account_Number} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Account Receivables Software Application</ControlLabel>
                                <FormGroup validationState={this.state.Account_Receivables_Software_Name_error}>
                                    <FormControl 
                                        name='Account_Receivables_Software_Name' 
                                        value={this.state.Account_Receivables_Software_Name} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Software Version</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name='Software Version' 
                                        value={this.state.Software_Version} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>EIN TIN</ControlLabel>
                                <FormGroup validationState={this.state.EIN_TIN_error}>
                                    <FormControl 
                                        name='EIN_TIN' 
                                        value={this.state.EIN_TIN} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>

                        <h2 className='account-section-title'>Volume</h2>

                        <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Estimated Monthly Volume</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name='Volume' 
                                        value={this.state.Volume} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Average Daily Volume</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name='Average_Day' 
                                        value={this.state.Average_Day} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Peak Day Volume</ControlLabel>
                                <FormGroup validationState={this.state.Peak_Day_error}>
                                    <FormControl 
                                        name='Peak_Day' 
                                        value={this.state.Peak_Day} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>

                        <h2 className='account-section-title'>Web Access 
                        <OverlayTrigger
                                placement={'top'}
                                overlay={
                                <Tooltip className={'tooltip'} id={`tooltip_web_access`}>
                                    Web Access provides same day access to view, print and query the data and images of your remittances. Summary and Detail reports of your activity make it easy to review your lockbox account activity. The output files for updating your accounts receivables can be retrieved via Web Access. Your Stop Files and Billing Payer Files can be sent to us via Web Access.
                                </Tooltip>}>
                                <i className="fal fa-question-circle"></i>
                            </OverlayTrigger>
                        </h2>

                        <Row>
                            <Col xs={12} sm={12} md={12}>
                            <label className='checkbox-label'>
                                <input
                                    name="Web_Access"
                                    type="checkbox"
                                    checked={isWeb_Access}
                                    onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}
                                    />
                                    <span className='checkbox-text'>
                                        Yes, I'd like to gain access to the Remit Members Hub
                                    </span>
                                </label>
                                {/* <Checkbox name='Web_Access' label={"Yes, I'd like to gain access to the Remit Members Hub"} checked={isWeb_Access} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                </Checkbox> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Web Admin 1 Name</ControlLabel>
                                <FormGroup validationState={this.state.Web_Access_Admin_Name_1_error}>
                                    <FormControl 
                                        name='Web_Access_Admin_Name_1' 
                                        value={this.state.Web_Access_Admin_Name_1} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                                <ControlLabel>Web Admin 1 Email</ControlLabel>
                                <FormGroup validationState={this.state.Web_Access_Admin_Email_1_error}>
                                    <FormControl 
                                        name='Web_Access_Admin_Name_2' 
                                        value={this.state.Web_Access_Admin_Email_1} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} sm={4} md={4}>
                                <ControlLabel>Web Admin 1 Phone</ControlLabel>
                                <FormGroup validationState={this.state.Web_Access_Admin_Phone_1_error}>
                                        <NumberFormat 
                                            format="(###) ###-####" 
                                            mask="_" className='form-control' 
                                            name='Web_Access_Admin_Phone_1' 
                                            value={this.state.Web_Access_Admin_Phone_1} 
                                            onChange={this.handleInputChange} 
                                            onBlur={(e) => {this.handleSave(e); this.validate(e)}} /> 
                                        <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={4} sm={2} md={2}>
                            <ControlLabel>Ext.</ControlLabel>
                                <FormGroup>
                                    <FormControl 
                                        name='Web_Access_Admin_Phone_Ext_1' 
                                        value={this.state.Web_Access_Admin_Phone_Ext_1} 
                                        onChange={(e) => {this.handleInputChange(e)}} 
                                        onBlur={(e) => {this.handleSave(e); this.validate(e)}} 
                                    />
                                    <HelpBlock>Required Field</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        {newWebAdmin}
                        {renderWebAdminInputs}
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <ButtonToolbar>
                                <Button id='addWebAdminButton' bsSize="small" onClick={this.addOne}>
                                <i className="far fa-plus"></i>
                                    Add
                                </Button>
                                <span>You can define up to 3 Web Administrators</span> 
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        <Row>
                            <div className='FFLink next ripple' onClick={this.validateFields}>Save & Close</div>
                        </Row>
                    </Form>
                    <ToastContainer />
                </div>
            </React.Fragment>
        )
    }
}

export default Account;