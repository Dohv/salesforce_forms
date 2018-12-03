import React, { Component } from 'react';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import formDataServices from '../../../services/formDataServices';
import NumberFormat from 'react-number-format';
import $ from 'jquery';

class knp1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            isForm: localStorage.getItem("isKNPForm") ? localStorage.getItem("isKNPForm") : false,
            target_go_live_date: '',
            isKlikRemit: localStorage.getItem("isKlikRemit") ? localStorage.getItem("isKlikRemit") : false,
            company_name: '',
            account_number: '',
            account_name: '',
            billing_account_number: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            contact_name: '',
            phone_number: '',
            email: '',
            ein_tin: '',
            entity_short_name: '',
            website: '',
            naics_code: '',
            isPaper: '',
            isDigital: '',
            bank_name: '',
            email_distribution_address: '',
            admin_contact_name: '',
            admin_phone_numner: '',
            isICL: '',
            isSaving: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.getFormData();
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
        this.setState({
            target_go_live_date: localStorage.getItem("Target_Go_Live_Date"),
            isKlikRemit: JSON.parse(localStorage.getItem("isKlikRemit")),
            company_name: localStorage.getItem("Company_Name"),
            account_number: localStorage.getItem("Account_Number"),
            account_name: localStorage.getItem("Company_Name"),
            billing_account_number: localStorage.getItem("Billing_Account_Number"),
            address: localStorage.getItem("Address"),
            city: localStorage.getItem("City"),
            state: localStorage.getItem("State"),
            zip_code: localStorage.getItem("Zip_Code"),
            contact_name: localStorage.getItem("Contact_Name"),
            phone_number: localStorage.getItem("Phone_Number"),
            email: localStorage.getItem("Email"),
            isForm: localStorage.getItem("isKNPForm"),
        });
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    render () {
        $('.setup').width($('.form').css('width'));
        $('.setup').css('top', $('.header').css('height'));
        let bool = this.state.isKlikRemit ? true : false;
        let savingStatus = this.state.isSaving ? 
        <div className="saving-anime">
            <div className="lds-ripple"><div></div><div></div></div>
            <p>saving</p> 
        </div> : '';
        return (

            <div className='behindForm'>
                {savingStatus}
                <div className='container'>
                        <Form className='form'>
                            <Row>
                                <FormControl className='datepicker' name='target_go_live_date' type='date' onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} value={this.state.target_go_live_date} label='Proposed go live date' />
                            </Row>
                            <Row>
                            <p className='form-comment'>Are you currently set up on Klik Remit?</p>
                            <div className="switch"><label>No<input type="checkbox" name='isKlikRemit' checked={bool} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                            <span className="lever"></span>Yes</label></div> 
                            </Row>
                            <h4 >Customer Profile</h4>
                            <Row>
                                <FormControl name='company_name' label="Company Name" value={this.state.company_name} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </Row>
                            <Row >
                                <p className='form-comment'>Please list the accounts or provide your entity list:</p>
                                <FormControl name='account_number' label="Account Number" value={this.state.account_number} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </Row>
                            <Row>
                                <FormControl name='account_name' label="Account Name" value={this.state.account_name} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <FormControl name='billing_account_number' label="Billing Account Number" value={this.state.billing_account_number} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row> 
                            <Row>
                                <FormControl name='address' label="Address" value={this.state.address} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <FormControl name= 'city' label="City" value={this.state.city} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <FormControl name='state' label="State" value={this.state.state} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <FormControl name='zip_code' label="Zip Code" value={this.state.zip_code} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                                <FormControl name='contact_name'label="Contact Name" value={this.state.contact_name} onChange={this.handleInputChange} onBlur={this.handleSave} />

                                <Col xs={8} sm={3} md={3}>
                                    <ControlLabel>Phone Number</ControlLabel>
                                    <NumberFormat format="(###) ###-####" mask="_" className='form-control' name='eKlik_Primary_Contact_Phone' value={this.state.phone_number} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                </Col>

                    
                                <FormControl name='email'label="Email" value={this.state.email} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                                <FormControl name='ein_tin' label="EIN/TIN"  onChange={this.handleInputChange}/>
                                <FormControl name='entity_short_name' label="Entity Short Name"  onChange={this.handleInputChange}/>
                                <FormControl name='website' label="Website"  onChange={this.handleInputChange}/>
                                <FormControl name='naics_code' label="NAICS Code" onChange={this.handleInputChange} />
                            </Row>
                            <h4>Billing & Bank Depository Information</h4>
                            <h5>Invoice Preference</h5>
                            <Row>
                                <FormControl name='isPaper' type='checkbox' label='Paper' onChange={this.handleInputChange} />
                                <FormControl name='isDigital' type='checkbox' label='Digital' onChange={this.handleInputChange} />
                                <p>(Provide e-mail distribution address if different from above.)</p>
                            </Row>
                            <Row>
                                <FormControl name='bank_name' label="Bank #1 Name"  onChange={this.handleInputChange}/>
                                <FormControl name='email_distribution_address' label="Email Distribution Address"  onChange={this.handleInputChange}/>
                                <FormControl name='admin_contact_name' label="Admin. Contact Name" onChange={this.handleInputChange} />
                                <FormControl name='admin_phone_number' label="Admin Phone Number" onChange={this.handleInputChange} />
                            </Row>
                            <Row>
                                <FormControl name='isICL' type='checkbox' label='ICL Image File' onChange={this.handleInputChange} />
                            </Row>
                        </Form>
                </div>
            </div>
    )};
};


export default knp1;