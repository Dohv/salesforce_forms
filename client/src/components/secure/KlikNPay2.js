import React, { Component } from 'react';
import { Row, Input, Icon } from 'react-materialize';
import formDataServices from '../../services/formDataServices';

class KlikNPay2 extends Component {
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
      window.Materialize.updateTextFields();
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    dateFormat(string) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let formatedDate = [];
        
        if(string.indexOf(',') !== -1) {
            const splitStr = string.split(' ');
            //console.log(splitStr);
            const monthNumber = months.indexOf(splitStr[1].slice(0, -1)) + 1;
            formatedDate.push(splitStr[2])
            formatedDate.push('-');
            monthNumber < 10 ? formatedDate.push(`0${monthNumber}`) : formatedDate.push(monthNumber);
            formatedDate.push('-');
            formatedDate.push(splitStr[0]);
            let result = formatedDate.join('');

            return result;
        }
        return this.state.target_go_live_date;
    }

    phoneNumberFormat(s) {
        if(s.length >= 9) {
            var s2 = (""+s).replace(/\D/g, '');
            var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
            return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
        }

        return this.state.phone_number;

    }

    render () {
        let bool = this.state.isKlikRemit ? true : false;
        let savingStatus = this.state.isSaving ? 
        <div className="saving-anime">
            <div className="lds-ripple"><div></div><div></div></div>
            <p>saving</p> 
        </div> : '';
        return (

            <div>
                {savingStatus}
                <div className='container'>
                    
                        <h2 className='form-title'>KlikNPay</h2>
                        <form className='col s12'>
                            
                            <h4 >Customer Profile</h4>
                            <Row>
                                <Input s={6} name='company_name' label="Company Name" value={this.state.company_name} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </Row>
                            <Row >
                                <p className='form-comment'>Please list the accounts or provide your entity list:</p>
                                <Input s={6} name='account_number' label="Account Number" value={this.state.account_number} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </Row>
                            <Row>
                                <Input s={6} name='account_name' label="Account Name" value={this.state.account_name} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <Input s={6} name='billing_account_number' label="Billing Account Number" value={this.state.billing_account_number} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row> 
                            <Row>
                                <Input s={5} name='address' label="Address" value={this.state.address} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <Input s={3} name= 'city' label="City" value={this.state.city} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <Input s={2} name='state' label="State" value={this.state.state} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <Input s={2} name='zip_code' label="Zip Code" value={this.state.zip_code} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                                <Input s={4} name='contact_name'label="Contact Name" value={this.state.contact_name} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <Input s={4} name='phone_number' label="Phone Number" value={this.phoneNumberFormat(this.state.phone_number)} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                <Input s={4} name='email'label="Email" value={this.state.email} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                                <Input s={3} name='ein_tin' label="EIN/TIN"  onChange={this.handleInputChange}/>
                                <Input s={3} name='entity_short_name' label="Entity Short Name"  onChange={this.handleInputChange}/>
                                <Input s={3} name='website' label="Website"  onChange={this.handleInputChange}/>
                                <Input s={3} name='naics_code' label="NAICS Code" onChange={this.handleInputChange} />
                            </Row>
                            <h4>Billing & Bank Depository Information</h4>
                            <h5>Invoice Preference</h5>
                            <Row>
                                <Input name='isPaper' type='checkbox' label='Paper' onChange={this.handleInputChange} />
                                <Input name='isDigital' type='checkbox' label='Digital' onChange={this.handleInputChange} />
                                <p>(Provide e-mail distribution address if different from above.)</p>
                            </Row>
                            <Row>
                                <Input s={3} name='bank_name' label="Bank #1 Name"  onChange={this.handleInputChange}/>
                                <Input s={3} name='email_distribution_address' label="Email Distribution Address"  onChange={this.handleInputChange}/>
                                <Input s={3} name='admin_contact_name' label="Admin. Contact Name" onChange={this.handleInputChange} />
                                <Input s={3} name='admin_phone_number' label="Admin Phone Number" onChange={this.handleInputChange} />
                            </Row>
                            <Row>
                                <Input name='isICL' type='checkbox' label='ICL Image File' onChange={this.handleInputChange} />
                            </Row>
                        </form>
                    
                </div>
            </div>
    )};
};


export default KlikNPay2;