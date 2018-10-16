import React, { Component } from 'react';
import { Row, Input } from 'react-materialize'
import formDataServices from '../../../services/formDataServices';


class eKlik2 extends Component {
    constructor(props) {
        super(props);
        this.state ={
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
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }


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

    isSelected(e) {
        if(this.state[e.target.name]) {
            return this.state[e.target.name];
        }

        return '0';
    }

    render() {
        let isFiserv = this.state.Fiserv ? true : false;
        let isRPPS = this.state.RPPS ? true : false;
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
                        <form className='col s12 form'>
                        <h4 >Basic Setup Information</h4>
                        <Row>
                              <p className='form-comment'>Bank Account Information for Where You Would Like the Funds Deposited</p>
                              <Input s={6} name='eKlik_Bank_Routing_Number' label="Bank Routing Number" value={this.state.eKlik_Bank_Routing_Number} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                              <Input s={6} name='eKlik_Bank_Account_Number' label="Bank Account Number" value={this.state.eKlik_Bank_Account_Number} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </Row>
                            <Row>
                              <p className='form-comment'>Are You Currently Enrolled Directly With Any of the following Online Payment Processors?</p>
                              <div className="eKlikSwitch switch">Fiserv<label className='yesNo'>No<input type="checkbox" name='Fiserv' checked={isFiserv} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                <span className="lever"></span>Yes</label></div>
                            </Row>
                            <Row>
                              <div className="eKlikSwitch switch">RPPS<label className='yesNo'>No<input type="checkbox" name='RPPS' checked={isRPPS} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                              <span className="lever"></span>Yes</label></div>
                            </Row>
                            <Row>
                              <Input s={6} name='Other_Online_Payment_Processor' label="Other" value={this.state.Other_Online_Payment_Processor} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </Row>
                            <Row>
                              <p className='form-comment'>Indicate All the Possible Names Customers Might Use On a Check Payment to Your Business</p>
                              <Input s={6} name='Check_Payment_Name_1' label="Name 1" value={this.state.Check_Payment_Name_1} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Check_Payment_Name_2' label="Name 2" value={this.state.Check_Payment_Name_2} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <Input s={6} name='Check_Payment_Name_3' label="Name 3" value={this.state.Check_Payment_Name_3} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Check_Payment_Name_4' label="Name 4" value={this.state.Check_Payment_Name_4} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <Input s={6} name='Check_Payment_Name_5' label="Name 5" value={this.state.Check_Payment_Name_5} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Check_Payment_Name_6' label="Name 6" value={this.state.Check_Payment_Name_6} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <Input s={6} name='Check_Payment_Name_7' label="Name 7" value={this.state.Check_Payment_Name_7} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Check_Payment_Name_8' label="Name 8" value={this.state.Check_Payment_Name_8} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <Input s={6} name='Check_Payment_Name_9' label="Name 9" value={this.state.Check_Payment_Name_9} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Check_Payment_Name_10' label="Name 10" value={this.state.Check_Payment_Name_10} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <p className='form-comment'>Indicate All the Possible Remittance Addresses Where Customers Might Send Your Payments</p>
                              <Input s={6} name='Remittance_Address_1' label="Address 1" value={this.state.Remittance_Address_1} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Remittance_Address_2' label="Address 2" value={this.state.Remittance_Address_2} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <Input s={6} name='Remittance_Address_3' label="Address 3" value={this.state.Remittance_Address_3} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Remittance_Address_4' label="Address 4" value={this.state.Remittance_Address_4} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <Input s={6} name='Remittance_Address_5' label="Address 5" value={this.state.Remittance_Address_5} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Remittance_Address_6' label="Address 6" value={this.state.Remittance_Address_6} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <Input s={6} name='Remittance_Address_7' label="Address 7" value={this.state.Remittance_Address_7} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Remittance_Address_8' label="Address 8" value={this.state.Remittance_Address_8} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                            <Row>
                              <Input s={6} name='Remittance_Address_9' label="Address 9" value={this.state.Remittance_Address_9} onChange={this.handleInputChange} onBlur={this.handleSave} />
                              <Input s={6} name='Remittance_Address_10' label="Address 10" value={this.state.Remittance_Address_10} onChange={this.handleInputChange} onBlur={this.handleSave} />
                            </Row>
                        </form>
                    
                </div>

            </div>
            </React.Fragment>
    )};
}

export default eKlik2;