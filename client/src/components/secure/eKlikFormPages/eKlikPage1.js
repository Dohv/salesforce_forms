import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import formDataServices from '../../../services/formDataServices';
import ReactResizeDetector from 'react-resize-detector';
import $ from 'jquery';


class eKlik1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            isSaving: false,
            eKlik_Company_Name: '',
            eKlik_Company_Name_error: null,
            eKlik_Primary_Contact: '',
            eKlik_Primary_Contact_error: null,
            eKlik_Primary_Contact_Phone: '',
            eKlik_Primary_Contact_Phone_error: null,
            eKlik_Primary_Contact_Phone_Extension: '',
            eKlik_Primary_Contact_Phone_Extension_error: null,
            eKlik_Primary_Contact_Email: '',
            eKlik_Primary_Contact_Email_error: null,
            eKlik_Business_Owner_Name: '',
            eKlik_Business_Owner_Name_error: null,
            eKlik_Business_Owner_Title: '',
            eKlik_Business_Owner_Title_error: null,
            eKlik_Business_Owner_Phone: '',
            eKlik_Business_Owner_Phone_error: null,
            eKlik_Business_Owner_Email: '',
            eKlik_Business_Owner_Email_error: null,
            eKlik_Physical_Address: '',
            eKlik_Physical_Address_error: null,
            eKlik_City: '',
            eKlik_City_error: null,
            eKlik_State: '',
            eKlik_State_error: null,
            eKlik_Zip_Code: '',
            eKlik_Zip_Code_error: null,
            Company_Website: '',
            Company_Website_error: null,
            eKlik_Privately_or_Publicly_Held: '',
            eKlik_Privately_or_Publicly_Held_error: null,
            Primary_Reason_for_accepting_payments: '',
            Primary_Reason_for_accepting_payments_error: null,
            Ticker_Symbol: '',
            Ticker_Symbol_error: null,
            Name_of_Exchange: '',
            Name_of_Exchange_error: null,
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
            errorCounter: 1,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validate = this.validate.bind(this);
        this.validateFields = this.validateFields.bind(this);
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
                eKlik_City: localStorage.getItem("eKlik_City"),
                eKlik_State: localStorage.getItem("eKlik_State"),
                eKlik_Zip_Code: localStorage.getItem("eKlik_Zip_Code"),
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
    }

    

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
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

    usStates() {
        let states = ["AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU",                      "HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO",                 "MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA",                 "PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];
                  
        return states.map(state => {
                return(<option key={state} value={state}>{state}</option>)
        });
    }

    validateFields() {
        console.log('yay');
        var counter = 0;
        const fields = ['eKlik_Company_Name', 'eKlik_Primary_Contact', 'eKlik_Primary_Contact_Phone', 'eKlik_Primary_Contact_Email', 'eKlik_Business_Owner_Name', 'eKlik_Business_Owner_Title', 'eKlik_Business_Owner_Phone', 'eKlik_Business_Owner_Email', 'eKlik_Physical_Address', 'eKlik_City', 'eKlik_State', 'eKlik_Zip_Code', 'Company_Website', 'Primary_Reason_for_accepting_payments', 'eKlik_Privately_or_Publicly_Held', 'Ticker_Symbol', 'Name_of_Exchange'];
        
        fields.forEach(field => {
            if(this.state[field] === '') {
                counter++
                this.setState({
                   [`${field}_error`]: 'error',
                })
            }
        });

        this.setState({
            errorCounter: counter,
        })
    }

    validate(e) {
       if(e.target.value !== '' || e.target.value !== null) {
            this.setState({
                [`${e.target.name}_error`]: null,
            }, () => {})
        }
    }


    
    
    render() {
        console.log(this.state.errorCounter);
        $('.setup').width($('.form').css('width'));
        $('.setup').css('top', $('.header').css('height'));
           
        
        
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
        
        let privPub = this.state.eKlik_Privately_or_Publicly_Held;
        let list = document.querySelectorAll('.privPub');
        if(privPub !== 'Publicly') {
            list.forEach(element => {
                element.classList.add('displayNone');
            });
        } else {
            list.forEach(element => {
                element.classList.remove('displayNone');
            });
        }
        
        let savingStatus = this.state.isSaving ? 
        <div className="saving-anime">
            <div className="lds-ripple"><div></div><div></div></div>
            <p>saving</p> 
        </div> : '';

        let nextPage = (this.props.currentFormPage + 1).toString();
        let path = this.props.match.path;
        const currPath = path.slice(0, path.lastIndexOf('/'))
        const validateOrNext = this.state.errorCounter > 0 ? <div className='FFLink next ripple' onMouseEnter={this.validateFields}>Next</div> : <Link className='FFLink next ripple disabled-link' onMouseEnter={this.validateFields} onClick={() => {this.props.handleNextFormPage(); this.props.handleNextRouteChangeAnimation(); this.props.updateClass(this.props.currentFormPage + 1) }} to={`${currPath}/${nextPage}`}>Next<i className="fas fa-caret-right"></i></Link>;
        const nextButton = this.props.currentFormPage === 3 ? '' : validateOrNext;
        
        return (
            <React.Fragment>
            <div className='behindForm'>
            {savingStatus}
                <div className='container'>
                        <Form className='form' id='eklikform1'>
                            <Col xs={12}>
                                <h4 className='eklik-page-title'>General Information</h4>
                            </Col>
                            <Row>
                                <Col xs={12} sm={6} md={6}>
                                    <ControlLabel>Company Name</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Company_Name_error}>
                                        <FormControl name='eKlik_Company_Name' value={this.state.eKlik_Company_Name} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                        <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} md={6}>
                                    <ControlLabel>Primary Contact</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Primary_Contact_error}>
                                            <FormControl name='eKlik_Primary_Contact' value={this.state.eKlik_Primary_Contact} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />  
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8} sm={3} md={3}>
                                    <ControlLabel>Primary Phone</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Primary_Contact_Phone_error}>
                                            <NumberFormat format="(###) ###-####" mask="_" className='form-control' name='eKlik_Primary_Contact_Phone' value={this.state.eKlik_Primary_Contact_Phone} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} /> 
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={4} sm={3} md={3}>
                                    <ControlLabel>Ext.</ControlLabel>
                                    <FormGroup>
                                        <FormControl name='eKlik_Primary_Contact_Phone_Extension' value={this.state.eKlik_Primary_Contact_Phone_Extension} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} /> 
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} md={6}>
                                    <ControlLabel>Primary Email</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Primary_Contact_Email_error}>
                                            <FormControl name='eKlik_Primary_Contact_Email' value={this.state.eKlik_Primary_Contact_Email} type="email" onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} /> 
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={6}>
                                    <ControlLabel>Business Owner Name</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Business_Owner_Name_error}>
                                            <FormControl name='eKlik_Business_Owner_Name' value={this.state.eKlik_Business_Owner_Name} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} /> 
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} md={6}>
                                    <ControlLabel>Business Owner Title</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Business_Owner_Title_error}>
                                            <FormControl name='eKlik_Business_Owner_Title' value={this.state.eKlik_Business_Owner_Title} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col> 
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={6}>
                                    <ControlLabel>Business Owner Phone</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Business_Owner_Phone_error}>
                                            <NumberFormat format="(###) ###-####" mask="_" className='form-control' name='eKlik_Business_Owner_Phone' value={this.state.eKlik_Business_Owner_Phone} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} /> 
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                    <Col xs={12} sm={6} md={6}>
                                        <ControlLabel>Business Owner Email</ControlLabel>
                                        <FormGroup validationState={this.state.eKlik_Business_Owner_Email_error}>
                                            <FormControl name='eKlik_Business_Owner_Email' value={this.state.eKlik_Business_Owner_Email} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                            <HelpBlock>Required Field</HelpBlock>
                                        </FormGroup>
                                    </Col> 
                            </Row>
                            <Row>
                                <Col xs={12} sm={5} md={5}>
                                    <ControlLabel>Address</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Physical_Address_error}>
                                            <FormControl name='eKlik_Physical_Address' value={this.state.eKlik_Physical_Address} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                        <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={4} sm={3} md={3}>
                                    <ControlLabel>City</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_City_error}>
                                            <FormControl name= 'eKlik_City' value={this.state.eKlik_City} onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={4} sm={2} md={2}>
                                    <ControlLabel>State</ControlLabel>  
                                    <FormGroup validationState={this.state.eKlik_State_error} controlId="formControlSelect">
                                            <FormControl componentClass="select" name='eKlik_State' value={this.state.eKlik_State} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} onBlur={this.validate}>
                                            <option value=''>State</option>
                                            <option value="AL">AL</option>
                                            <option value="AK">AK</option>
                                            <option value="AR">AR</option>	
                                            <option value="AZ">AZ</option>
                                            <option value="CA">CA</option>
                                            <option value="CO">CO</option>
                                            <option value="CT">CT</option>
                                            <option value="DC">DC</option>
                                            <option value="DE">DE</option>
                                            <option value="FL">FL</option>
                                            <option value="GA">GA</option>
                                            <option value="HI">HI</option>
                                            <option value="IA">IA</option>	
                                            <option value="ID">ID</option>
                                            <option value="IL">IL</option>
                                            <option value="IN">IN</option>
                                            <option value="KS">KS</option>
                                            <option value="KY">KY</option>
                                            <option value="LA">LA</option>
                                            <option value="MA">MA</option>
                                            <option value="MD">MD</option>
                                            <option value="ME">ME</option>
                                            <option value="MI">MI</option>
                                            <option value="MN">MN</option>
                                            <option value="MO">MO</option>	
                                            <option value="MS">MS</option>
                                            <option value="MT">MT</option>
                                            <option value="NC">NC</option>	
                                            <option value="NE">NE</option>
                                            <option value="NH">NH</option>
                                            <option value="NJ">NJ</option>
                                            <option value="NM">NM</option>			
                                            <option value="NV">NV</option>
                                            <option value="NY">NY</option>
                                            <option value="ND">ND</option>
                                            <option value="OH">OH</option>
                                            <option value="OK">OK</option>
                                            <option value="OR">OR</option>
                                            <option value="PA">PA</option>
                                            <option value="RI">RI</option>
                                            <option value="SC">SC</option>
                                            <option value="SD">SD</option>
                                            <option value="TN">TN</option>
                                            <option value="TX">TX</option>
                                            <option value="UT">UT</option>
                                            <option value="VT">VT</option>
                                            <option value="VA">VA</option>
                                            <option value="WA">WA</option>
                                            <option value="WI">WI</option>	
                                            <option value="WV">WV</option>
                                            <option value="WY">WY</option>
                                            </FormControl>
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={4} sm={2} md={2}>
                                    <ControlLabel>Zip Code</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Zip_Code_error}>
                                            <FormControl name='eKlik_Zip_Code' value={this.state.eKlik_Zip_Code} maxLength="5" onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={6}>
                                    <ControlLabel>Company Website</ControlLabel>
                                    <FormGroup validationState={this.state.Company_Website_error}>
                                            <FormControl value={this.state.Company_Website} name='Company_Website' onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={6} md={6}>
                                    <ControlLabel>Primary reason for accepting payments</ControlLabel>
                                    <FormGroup validationState={this.state.Primary_Reason_for_accepting_payments_error}>
                                            <FormControl type='text' name='Primary_Reason_for_accepting_payments' value={this.state.Primary_Reason_for_accepting_payments}onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={5} md={5}>
                                    <ControlLabel className='longerFormInputLabels'>Is your company Privately or Publicly Held</ControlLabel>
                                    <FormGroup validationState={this.state.eKlik_Privately_or_Publicly_Held_error} controlId="formControlsSelect">
                                            <FormControl componentClass="select" name='eKlik_Privately_or_Publicly_Held' value={this.state.eKlik_Privately_or_Publicly_Held} onChange={(e) => {this.handleInputChange(e); this.handleSave(e) }} onBlur={this.validate}>
                                                <option value=''>Choose</option>
                                                <option value='Publicly'>Publicly</option>
                                                <option value='Privately'>Privately</option>
                                            </FormControl>
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={6} sm={3} md={3} className='privPub'>
                                    <ControlLabel>Name of Exchange</ControlLabel>
                                    <FormGroup validationState={this.state.Name_of_Exchange_error}>
                                            <FormControl componentClass="select" name='Name_of_Exchange' value={this.state.Name_of_Exchange} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} onBlur={this.validate}>
                                            <option value=''>Choose</option>
                                                <option value='NASDAQ'>NASDAQ</option>
                                                <option value='NYSE'>NYSE</option>
                                            </FormControl>
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                                <Col xs={6} sm={4} md={4} className='privPub'>
                                    <ControlLabel>Ticker Symbol</ControlLabel>
                                    <FormGroup validationState={this.state.Ticker_Symbol_error}>
                                            <FormControl s={6} value={this.state.Ticker_Symbol} name='Ticker_Symbol' onChange={this.handleInputChange} onBlur={(e) => {this.handleSave(e); this.validate(e)}} />
                                            <HelpBlock>Required Field</HelpBlock>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Col xs={12}>
                                <p className='form-comment'>Does your business engage in any of the following:</p>
                            </Col>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox className='checkbox' name='is_Property_Management_Company' checked={isPropertyManagementCompany} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Property Management Company
                                        </Checkbox>
                                    </Col>
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Payday_Lenders' checked={isPaydayLenders} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                        Payday Lenders, Check Cashing, Currency Exchange  
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Subprime_Loan_Originator' checked={isSubprimeLoanOriginator} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Subprime Loan Originator
                                        </Checkbox>
                                    </Col>
                                    <Col xs={12} sm={6} md={6}>
                                       <Checkbox name='Credit_Repair_Services_Company' checked={isCreditRepairServicesCompnay} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Credit Repair Services Company
                                        </Checkbox> 
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Debt_Consolidation_Services' checked={isDebtConsolidationServices} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Debt Consolidation Services or Forgiveness
                                        </Checkbox>
                                    </Col>
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Loan_Modification_Services' checked={isLoanModificationServices} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Loan Modification Services
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Online_Payment_Processor' checked={isOnlinePaymentProcessor} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} >
                                            Online Payment Processor or Third Party Payment Processor
                                        </Checkbox>
                                    </Col>
                                     
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Online_Gambling_Related_Operations' checked={isOnlineGamblingRelatedOperations} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Online Gambling Related Operations
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                   <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Business_Located_Outside_the_US' checked={isBusinessLocatedOutsideTheUS} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Business Located Outside the US
                                        </Checkbox> 
                                   </Col>
                                    
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Mail_or_Telephone_Orders_Company' checked={isMailOrTelephoneOrdersCompany} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Mail Order or Telephone Orders Company
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </FormGroup>
                    
                            <FormGroup>
                                <Row>
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Adult_Entertainment_Businesses' checked={isAdultEntertainmentBusinesses} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Adult Entertainment Businesses 
                                        </Checkbox>
                                    </Col> 
                                    <Col xs={12} sm={6} md={6}>
                                        <Checkbox name='Telemarketing_Company' checked={isTelemarketingCompany} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                            Telemarketing Company
                                        </Checkbox>
                                    </Col>
                                    {nextButton}
                                </Row>
                            </FormGroup>
                        </Form>
                </div>
            </div>
            </React.Fragment>
    )};
}

export default eKlik1;