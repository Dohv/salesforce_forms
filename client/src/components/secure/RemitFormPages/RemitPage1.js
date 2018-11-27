import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button } from 'react-bootstrap';
import formDataServices from '../../../services/formDataServices';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip';


class Remit1 extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isLoggedIn: this.props.isLoggedIn,
            isSaving: false,
            Remit_Target_Go_Live_Date: '',
            Remit_Today_s_Date: '',
            Remit_FI_Rep_Contact_Email: '',
            Remit_FI_Rep_Contact_Name: '',	
            Remit_FI_Rep_Contact_Phone: '',
            Remit_FI_Rep_Contact_Title: '',
            Remit_Company_Name: '',
            Action_Requested: '',
            Billing_Account_Number: '',
            Deposit_Account_Number: '',
            EIN_TIN: '',
            Remit_Company_Contact_Email: '',	
            Remit_Company_Contact_Name: '',		
            Remit_Company_Contact_Phone: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

     // //memory leak fix https://www.youtube.com/watch?v=8BNdxFzMeVg 8 min in
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
            Remit_Target_Go_Live_Date: localStorage.getItem("Remit_Target_Go_Live_Date"),
            Remit_Today_s_Date: localStorage.getItem("Remit_Today_s_Date"),
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

    // onChange(e) {
    //     let files = e.target.files;
    //     console.log(files); 
    //     let reader = new FileReader();
        
    //     reader.readAsDataURL(files[0]);
    //     reader.onload = (e) => {
    //         console.log(e.target.result);
    //     }

    //     <div onSubmit={this.onFormSubmit}>
    //                             <input type='file' name='file' onChange={(e) => {this.onChange(e)}} />
    //                         </div>
    // }

    render() {
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
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Target Go Live Date</ControlLabel>
                                        <FormControl
                                            type='date' 
                                            dateformat="MM/DD/YYY"
                                            name='Remit_Target_Go_Live_Date' 
                                            value={this.state.Remit_Target_Go_Live_Date} 
                                            onChange={(e) => {this.handleInputChange(e)}}
                                            onBlur={(e) => {this.handleSave(e)}} 
                                        />   
                                    </Col>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Today's Date</ControlLabel>
                                        <FormControl
                                            type='date' 
                                            dateformat="MM/DD/YYY"
                                            name='Remit_Today_s_Date' 
                                            value={this.state.Remit_Today_s_Date} 
                                            onChange={(e) => {this.handleInputChange(e)}}
                                            onBlur={(e) => {this.handleSave(e)}} 
                                        />   
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>FI Contact Name</ControlLabel>
                                        <FormControl name='Remit_FI_Rep_Contact_Name' placeholder="Primary Email" value={this.state.Remit_FI_Rep_Contact_Name} type="email" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>FI Contact Title</ControlLabel>
                                        <FormControl name='Remit_FI_Rep_Contact_Title' placeholder="FI Contact Title" value={this.state.Remit_FI_Rep_Contact_Title} type="email" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>

                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>FI Contact Phone</ControlLabel>
                                        <NumberFormat format="(###) ###-####" mask="_" className='form-control' name='Remit_FI_Rep_Contact_Phone' 
                                        placeholder="FI Contact Phone" value={this.state.Remit_FI_Rep_Contact_Phone} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>FI Contact Email</ControlLabel>
                                        <FormControl name='Remit_FI_Rep_Contact_Email' placeholder="FI Contact Email" value={this.state.Remit_FI_Rep_Contact_Email} type="email" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Company Name</ControlLabel>
                                        <FormControl name='Remit_Company_Name' placeholder="Company Name" value={this.state.Remit_Company_Name} type="text" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Action Requested</ControlLabel>
                                        <FormControl componentClass="select" placeholder="Choose an item" name='Action_Requested' value={this.state.Action_Requested} onChange={(e) => {this.handleInputChange(e); this.handleSave(e) }}>
                                        <option value='0'>Choose an item</option>
                                            <option value='New'>New</option>
                                            <option value='Add'>Add</option>
                                            <option value="Change">Change</option>
                                        </FormControl>
                                    </Col>

                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={4} md={4}>
                                        <ControlLabel>Billing Account Number</ControlLabel>
                                        <FormControl name='Billing_Account_Number' placeholder="Billing Account Number" value={this.state.Billing_Account_Number} type="text" onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col>
                                    
                                    <Col xs={12} sm={4} md={4}>
                                        <ControlLabel className='longerFormInputLabels'>Deposit Account Number (if different)</ControlLabel>
                                        <FormControl name='Deposit_Account_Number' placeholder="Deposit Account Number" value={this.state.Deposit_Account_Number} type="text" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col xs={12} sm={4} md={4}>
                                        <ControlLabel>EIN/TIN</ControlLabel>
                                        <FormControl name='EIN_TIN' placeholder="EIN/TIN" value={this.state.EIN_TIN} type="text" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={4} md={4}>
                                        <ControlLabel>Company Contact Name</ControlLabel>
                                        <FormControl name='Remit_Company_Contact_Name' placeholder="Company Contact Name" value={this.state.Remit_Company_Contact_Name} type="text" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col xs={12} sm={4} md={4}>
                                        <ControlLabel>Company Contact Phone</ControlLabel>
                                        <FormControl name='Remit_Company_Contact_Phone' placeholder="Company Contact Phone" value={this.state.Remit_Company_Contact_Phone} type="text" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col xs={12} sm={4} md={4}>
                                        <ControlLabel>Company Contact Email</ControlLabel>
                                        <FormControl name='Remit_Company_Contact_Email' placeholder="Company Contact Email" value={this.state.Remit_Company_Contact_Email} type="text" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                </Row>
                            </FormGroup>
                            {/* <p data-tip="hello world">Tooltip</p> */}

                        </Form>
                        {/* <ReactTooltip /> */}
                </div>

            </div>
            </React.Fragment>
    )};
}

export default Remit1;