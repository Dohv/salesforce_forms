import React, { Component } from 'react';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock, ButtonToolbar, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import formDataServices from '../../../services/formDataServices';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class catch1 extends Component {
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
        this.validate = this.validate.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }
    // //memory leak fix https://www.youtube.com/watch?v=8BNdxFzMeVg 8 min in
    _isMounted = false;

    componentDidMount() {
        const x = document.querySelector('.lockbox-container'); 
        const y = document.querySelector('.formMenuGreeting');
        const z = document.querySelector('.lockbox-products');
        if(x && y) {x.classList.add('displayNone'); y.classList.add('displayNone'); z.classList.add('displayNone')}
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

    onChange(e) {
        let files = e.target.files;
        console.log(files); 
        let reader = new FileReader();
        
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.log(e.target.result);
        }
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


    validateFields() {
        var counter = 0;
        const fields = ['eKlik_Business_Owner_Name', 'eKlik_Business_Owner_Title', 'eKlik_Business_Owner_Phone', 'eKlik_Business_Owner_Email', 'eKlik_Physical_Address', 'eKlik_City', 'eKlik_State', 'eKlik_Zip_Code', 'Company_Website', 'Primary_Reason_for_accepting_payments', 'eKlik_Privately_or_Publicly_Held', 'Ticker_Symbol', 'Name_of_Exchange'];
        
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

        let nextPage = (this.props.currentFormPage + 1).toString();
        let path = this.props.match.path;
        const currPath = path.slice(0, path.lastIndexOf('/'))

        if(counter > 0) {
           this.notify();
        } else {    
            this.props.handleNextFormPage(); 
            this.props.handleNextRouteChangeAnimation(); 
            this.props.updateClass(this.props.currentFormPage + 1);
            this.props.history.push(`${currPath}/${nextPage}`);
        }
        
    }

    notify = () => toast.error('You still have incomplete fields', {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast', 
    });

    validate(e) {
       if(e.target.value !== '' || e.target.value !== null) {
            this.setState({
                [`${e.target.name}_error`]: null,
            }, () => {})
        }
    }
    // onChange(e) {
    //     let files = e.target.files;
    //     console.log({name: files[0].name}); 
    //     let reader = new FileReader();
        
    //     reader.readAsDataURL(files[0]);
    //     reader.onload = (e) => {
    //        // console.log(e.target.result);
    //     }
    // }

    render() {
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

        const validateOrNext = <div className='FFLink next ripple disabled-link' onClick={this.validateFields}>Next<i className="fas fa-caret-right"></i></div>;
        const nextButton = this.props.currentFormPage === 3 ? '' : validateOrNext;
        
        return (
            <React.Fragment>
            <div className='behindForm'>
            {savingStatus}
                <div className='container'>
                        <Form className='form' id='eklikform1'>
                        <div>
                            <input type='file' name='file' onChange={(e) => {this.onChange(e)}} />
                        </div>
                            <Row>
                                <Col xs={12}>
                                    <h4 className='eklik-page-title'>Catch! Information</h4>
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
                                <Row>
                                    <p className='form-comment'>Does your business engage in any of the following:</p>
                                </Row>
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
                            <Row>
                                <Col xs={12}>
                                {nextButton} 
                                </Col>
                            </Row>
                        </Form>
                        <ToastContainer />
                </div>
            </div>
            </React.Fragment>
    )};
}

export default catch1;