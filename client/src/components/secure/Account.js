import React, { Component } from 'react';
import $ from 'jquery';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import {Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import accountDataServices from '../../services/accountDataServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Name_error: null,
            Phone: '',
            Phone_error: null,
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
            EIN_TIN: '',
            EIN_TIN_error: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getAccountData = this.getAccountData.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }

    componentDidMount() {
        $('.setup').width($('.accountForm').css('width'));
        $('.setup').css('top', $('.header').css('height'));
        this._isMounted = true;
        this.getAccountData()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _isMounted = false;

    async getAccountData() {
        await accountDataServices.getAccountDataFromServer(localStorage.getItem('sfAccountId'))
        if(this._isMounted && localStorage.getItem('token')) {
            this.setState({
                Name: localStorage.getItem('Name'),
                Phone: localStorage.getItem('Phone'),
                Website: localStorage.getItem('Website'),
                EIN_TIN: localStorage.getItem('EIN_TIN'),
                Company_Address_Street: localStorage.getItem('Company_Address_Street'),
                Company_Address_City: localStorage.getItem('Company_Address_City'),
                Company_Address_State: localStorage.getItem('Company_Address_State'),
                Company_Address_Zip: localStorage.getItem('Company_Address_Zip')
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
        const fields = ['Name', 'Phone', 'Website', 'EIN_TIN', 'Company_Address_Street', 'Company_Address_City', 'Company_Address_State', 'Company_Address_Zip'];
        
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

    render() {
        if($('.accountForm')) {
            $(window).resize(function() {
                $('.setup').width($('.accountForm').css('width'));
                $('.setup').css('top', $('.header').css('height'));
            })
        }
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='setup account-title'>Account</div>
                    <Form className='form accountForm'>
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
                                <ControlLabel>Primary Phone</ControlLabel>
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
                        <Row>
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Primary Street</ControlLabel>
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
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Primary City</ControlLabel>
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
                        </Row>
                        <Row>
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Primary State</ControlLabel>
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
                            <Col xs={12} sm={6} md={6}>
                            <ControlLabel>Primary Zip</ControlLabel>
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
                            <div className='FFLink next ripple' onClick={this.validateFields}>Complete<i className="fas fa-caret-right"></i></div>
                        </Row>
                    </Form>
                    <ToastContainer />
                </div>
            </React.Fragment>
        )
    }
}

export default Account;