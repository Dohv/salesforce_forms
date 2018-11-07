import React, { Component } from 'react';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import formDataServices from '../../../services/formDataServices';


class eKlik1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            isSaving: false,
            phone_number: '',
            eKlik_Company_Name: '',
            eKlik_Primary_Contact: '',
            eKlik_Primary_Contact_Phone: '',
            eKlik_Primary_Contact_Phone_Extension: '',
            eKlik_Primary_Contact_Email: '',
            eKlik_Business_Owner_Name: '',
            eKlik_Business_Owner_Title: '',
            eKlik_Business_Owner_Phone: '',
            eKlik_Business_Owner_Email: '',
            eKlik_Physical_Address: '',
            eKlik_City: '',
            eKlik_State: '',
            eKlik_Zip_Code: '',
            Company_Website: '',
            eKlik_Privately_or_Publicly_Held: '',
            Primary_Reason_for_accepting_payments: '',
            Ticker_Symbol: '',
            Name_of_Exchange: '',
            is_Property_Management_Company: localStorage.getItem("is_Property_Management_Company") ?localStorage.getItem("is_Property_Management_Company") : false,
            Payday_Lenders: localStorage.getItem("Payday_Lenders") ? localStorage.getItem("Payday_Lenders") : false,
            Subprime_Loan_Originator: localStorage.getItem("Subprime_Loan_Originator") ? localStorage.getItem("Subprime_Loan_Originator") : false,
            Credit_Repair_Services_Company: localStorage.getItem("Credit_Repair_Services_Company") ?localStorage.getItem("Credit_Repair_Services_Company") : false,
            Debt_Consolidation_Services: localStorage.getItem("Debt_Consolidation_Services") ? localStorage.getItem("Debt_Consolidation_Services") : false,
            Loan_Modification_Services: localStorage.getItem("Loan_Modification_Services") ? localStorage.getItem("Loan_Modification_Services") : false,
            Online_Payment_Processor: localStorage.getItem("Online_Payment_Processor") ? localStorage.getItem("Online_Payment_Processor") : false,
            Online_Gambling_Related_Operations: localStorage.getItem("Online_Gambling_Related_Operations") ? localStorage.getItem("Online_Gambling_Related_Operations") : false,
            Business_Located_Outside_the_US: localStorage.getItem("Business_Located_Outside_the_US") ? localStorage.getItem("Business_Located_Outside_the_US") : false,
            Mail_or_Telephone_Orders_Company: localStorage.getItem("Mail_or_Telephone_Orders_Company") ? localStorage.getItem("Mail_or_Telephone_Orders_Company") : false,
            Adult_Entertainment_Businesses: localStorage.getItem("Adult_Entertainment_Businesses") ? localStorage.getItem("Adult_Entertainment_Businesses") : false,
            Telemarketing_Company: localStorage.getItem("Telemarketing_Company") ? localStorage.getItem("Telemarketing_Company") : false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    // //memory leak fix https://www.youtube.com/watch?v=8BNdxFzMeVg 8 min in
    _isMounted = false;

    componentDidMount() {
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
                eKlik_Company_Name: localStorage.getItem("eKlik_Company_Name"),
                eKlik_Primary_Contact: localStorage.getItem("eKlik_Primary_Contact"),
                eKlik_Primary_Contact_Phone: localStorage.getItem("eKlik_Primary_Contact_Phone"),
                eKlik_Primary_Contact_Phone_Extension: localStorage.getItem("eKlik_Primary_Contact_Phone_Extension"),
                eKlik_Primary_Contact_Email: localStorage.getItem("eKlik_Primary_Contact_Email"),
                eKlik_Business_Owner_Name: localStorage.getItem("eKlik_Business_Owner_Name"),
                eKlik_Business_Owner_Title: localStorage.getItem("eKlik_Business_Owner_Title"),
                eKlik_Business_Owner_Phone: localStorage.getItem("eKlik_Business_Owner_Phone"),
                eKlik_Business_Owner_Email: localStorage.getItem("eKlik_Business_Owner_Email"),
                eKlik_Physical_Address: localStorage.getItem("eKlik_Physical_Address"),
                Company_Website: localStorage.getItem("Company_Website"),
                eKlik_Privately_or_Publicly_Held: localStorage.getItem("eKlik_Privately_or_Publicly_Held"),
                Ticker_Symbol: localStorage.getItem("Ticker_Symbol"),
                Primary_Reason_for_accepting_payments: localStorage.getItem("Primary_Reason_for_accepting_payments"), 
                Name_of_Exchange: localStorage.getItem("Name_of_Exchange"),
                is_Property_Management_Company: JSON.parse(localStorage.getItem("is_Property_Management_Company")),
                Payday_Lenders: JSON.parse(localStorage.getItem("Payday_Lenders")),
                Subprime_Loan_Originator: JSON.parse(localStorage.getItem("Subprime_Loan_Originator")),
                Credit_Repair_Services_Company: JSON.parse(localStorage.getItem("Credit_Repair_Services_Company")),
                Debt_Consolidation_Services: JSON.parse(localStorage.getItem("Debt_Consolidation_Services")),
                Loan_Modification_Services: JSON.parse(localStorage.getItem("Loan_Modification_Services")),
                Online_Payment_Processor: JSON.parse(localStorage.getItem("Online_Payment_Processor")),
                Online_Gambling_Related_Operations: JSON.parse(localStorage.getItem("Online_Gambling_Related_Operations")),
                Business_Located_Outside_the_US: JSON.parse(localStorage.getItem("Business_Located_Outside_the_US")),
                Mail_or_Telephone_Orders_Company: JSON.parse(localStorage.getItem("Mail_or_Telephone_Orders_Company")),
                Adult_Entertainment_Businesses: JSON.parse(localStorage.getItem("Adult_Entertainment_Businesses")),
                Telemarketing_Company: JSON.parse(localStorage.getItem("Telemarketing_Company")),
                
            });
        }
      //window.Materialize.updateTextFields();
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
            console.log(splitStr);
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

    isSelected(e) {
        if(this.state[e.target.name]) {
            return this.state[e.target.name];
        }

        return '0';
    }

    onChange(e) {
        let files = e.target.files;
        console.log(files); 
        let reader = new FileReader();
        
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.log(e.target.result);
        }
    }

    render() {
        const isPrivateOrPublicSelected = this.state.eKlik_Privately_or_Publicly_Held ? this.state.eKlik_Privately_or_Publicly_Held : '0';  
        const isExchangeSelected = this.state.eKlik_Privately_or_Publicly_Held ? this.state.eKlik_Privately_or_Publicly_Held : '0';   
        
        
        let isPropertyManagementCompany = this.state.is_Property_Management_Company ? true : false;
        let isPaydayLenders = this.state.Payday_Lenders ? true : false;
        let isSubprimeLoanOriginator = this.state.Subprime_Loan_Originator ? true : false;
        let isCreditRepairServicesCompnay = this.state.Credit_Repair_Services_Company ? true : false;
        let isDebtConsolidationServices = this.state.Debt_Consolidation_Services ? true : false;
        let isLoanModificationServices = this.state.Loan_Modification_Services ? true : false;
        let isOnlinePaymentProcessor = this.state.Online_Payment_Processor ? true : false;
        let isOnlineGamblingRelatedOperations = this.state.Online_Gambling_Related_Operations ? true : false;
        let isBusinessLocatedOutsideTheUS = this.state.Business_Located_Outside_the_US ? true : false;
        let isMailOrTelephoneOrdersCompany = this.state.Mail_or_Telephone_Orders_Company ? true : false;
        let isAdultEntertainmentBusinesses = this.state.Adult_Entertainment_Businesses ? true : false;
        let isTelemarketingCompany = this.state.Telemarketing_Company ? true : false;
        
        
        
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
                        <Form className='col s12 form'>
                            <h4 >General Information</h4>
                            <FormGroup>
                               <Row>
                                    <Col md={6}>
                                        <FormControl name='eKlik_Company_Name' placeholder="Company Name" value={this.state.eKlik_Company_Name} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col>
                                    <Col md={6}>
                                        <FormControl name='eKlik_Primary_Contact' placeholder="Primary Contact" value={this.state.eKlik_Primary_Contact} onChange={this.handleInputChange} onBlur={this.handleSave} />  
                                    </Col>
                               </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={5}>
                                        <NumberFormat format="(###) ###-####" mask="_" className='form-control' name='eKlik_Primary_Contact_Phone' placeholder="Phone" value={this.state.eKlik_Primary_Contact_Phone} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col md={2}>
                                        <FormControl name='eKlik_Primary_Contact_Phone_Extension' placeholder="Ext." value={this.state.eKlik_Primary_Contact_Phone_Extension} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col md={5}>
                                        <FormControl s={6} name='eKlik_Primary_Contact_Email' placeholder="Email" value={this.state.eKlik_Primary_Contact_Email} type="email" onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <FormControl s={6} name='eKlik_Business_Owner_Name' placeholder="Business Owner Name" value={this.state.eKlik_Business_Owner_Name} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col md={6}>
                                        <FormControl s={6} name='eKlik_Business_Owner_Title' placeholder="Business Owner Title" value={this.state.eKlik_Business_Owner_Title} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col> 
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <NumberFormat format="(###) ###-####" mask="_" className='form-control' name='eKlik_Business_Owner_Phone' placeholder="Business Owner Phone" value={this.state.eKlik_Business_Owner_Phone} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                                    </Col>
                                    <Col md={6}>
                                        <FormControl s={6} name='eKlik_Business_Owner_Email' placeholder="Business Owner Email" value={this.state.eKlik_Business_Owner_Email} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col>
                                </Row> 
                            </FormGroup>
                            
                            <FormGroup>
                                <Row>
                                   <Col md={5}>
                                        <FormControl name='eKlik_Physical_Address' placeholder="Address" value={this.state.eKlik_Physical_Address} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                   </Col>
                                    <Col md={3}>
                                        <FormControl name= 'eKlik_City' placeholder="City" value={this.state.eKlik_City} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col>
                                    <Col md={2}>
                                        <FormControl name='eKlik_State' placeholder="State" value={this.state.eKlik_State} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col>
                                    <Col md={2}>
                                        <FormControl name='eKlik_Zip_Code' placeholder="Zip Code" value={this.state.eKlik_Zip_Code} onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={12}>
                                        <FormControl value={this.state.Company_Website} name='Company_Website' placeholder='Company Website' onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup controlId="formControlsSelect">
                                <Row>
                                    <Col md={6}>
                                        <ControlLabel>Is your company Privately or Publicly Held</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" name='eKlik_Privately_or_Publicly_Held' value={isPrivateOrPublicSelected} onChange={(e) => {this.handleInputChange(e); this.handleSave(e) }}>
                                        <option value='0' disabled>Choose</option>
                                            <option value='Publicly'>Publicly</option>
                                            <option value='Privately'>Privately</option>
                                        </FormControl>
                                    </Col>
                            
                                    <Col md={6}>
                                        <FormControl type='text' name='Primary_Reason_for_accepting_payments' placeholder='Primary reason for accepting payments' />
                                    </Col>
                                </Row>
                            </FormGroup>
      
                            <FormGroup>
                               <Row>
                                    <Col md={6}>
                                        <ControlLabel>Name of Exchange</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" name='Name_of_Exchange' value={isExchangeSelected} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                        <option value='0' disabled>Choose</option>
                                            <option value='NASDAQ'>NASDAQ</option>
                                            <option value='NYSE'>NYSE</option>
                                        </FormControl>
                                    </Col>
                                    <Col md={6}>
                                        <FormControl s={6} value={this.state.Ticker_Symbol} name='Ticker_Symbol' placeholder='Ticker Symbol' onChange={this.handleInputChange} onBlur={this.handleSave} />
                                    </Col>
                               </Row>
                             
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <p className='form-comment'>Does your business engage in any of the following:</p>
                                    <Col md={6}>
                                        <Checkbox className='checkbox' name='is_Property_Management_Company' checked={isPropertyManagementCompany} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Property Management Company
                                        </Checkbox>
                                    </Col>
                                    <Col md={6}>
                                        <Checkbox name='Payday_Lenders' checked={isPaydayLenders} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                        Payday Lenders, Check Cashing, Currency Exchange  
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <Checkbox name='Subprime_Loan_Originator' checked={isSubprimeLoanOriginator} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Subprime Loan Originator
                                        </Checkbox>
                                    </Col>
                                    <Col md={6}>
                                       <Checkbox name='Credit_Repair_Services_Company' checked={isCreditRepairServicesCompnay} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Credit Repair Services Company
                                        </Checkbox> 
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <Checkbox name='Debt_Consolidation_Services' checked={isDebtConsolidationServices} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Debt Consolidation Services or Forgiveness
                                        </Checkbox>
                                    </Col>
                                    <Col md={6}>
                                        <Checkbox name='Loan_Modification_Services' checked={isLoanModificationServices} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Loan Modification Services
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <Checkbox name='Online_Payment_Processor' checked={isOnlinePaymentProcessor} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} >
                                            Online Payment Processor or Third Party Payment Processor
                                        </Checkbox>
                                    </Col>
                                     
                                    <Col md={6}>
                                        <Checkbox name='Online_Gambling_Related_Operations' checked={isOnlineGamblingRelatedOperations} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Online Gambling Related Operations
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                   <Col md={6}>
                                        <Checkbox name='Business_Located_Outside_the_US' checked={isBusinessLocatedOutsideTheUS} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Business Located Outside the US
                                        </Checkbox> 
                                   </Col>
                                    
                                    <Col md={6}>
                                        <Checkbox name='Mail_or_Telephone_Orders_Company' checked={isMailOrTelephoneOrdersCompany} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Mail Order or Telephone Orders Company
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                    
                            <FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <Checkbox name='Adult_Entertainment_Businesses' checked={isAdultEntertainmentBusinesses} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Adult Entertainment Businesses 
                                        </Checkbox>
                                    </Col> 
                                    <Col md={6}>
                                        <Checkbox name='Telemarketing_Company' checked={isTelemarketingCompany} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Telemarketing Company
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                </div>
            </div>
            </React.Fragment>
    )};
}

export default eKlik1;