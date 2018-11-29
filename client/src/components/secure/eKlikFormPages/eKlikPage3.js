import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Col, Row, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import formDataServices from '../../../services/formDataServices';
import $ from 'jquery';


class eKlik3 extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isLoggedIn: this.props.isLoggedIn,
            isSaving: false,
            Mask_1: '',
            Mask_2: '',
            Mask_3: '',
            Mask_4: '',
            Mask_5: '',
            Contains_Alpha_1: '',
            Contains_Alpha_2: '',
            Contains_Alpha_3: '',
            Contains_Alpha_4: '',
            Contains_Alpha_5: '',
            Contains_Numeric_1: '',
            Contains_Numeric_2: '',
            Contains_Numeric_3: '',
            Contains_Numeric_4: '',
            Contains_Numeric_5: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

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
            Mask_1: localStorage.getItem("Mask_1"),
            Mask_2: localStorage.getItem("Mask_1"),
            Mask_3: localStorage.getItem("Mask_1"),
            Mask_4: localStorage.getItem("Mask_1"),
            Mask_5: localStorage.getItem("Mask_1"),
            Contains_Alpha_1: JSON.parse(localStorage.getItem("Contains_Alpha_1")),
            Contains_Alpha_2: JSON.parse(localStorage.getItem("Contains_Alpha_2")),
            Contains_Alpha_3: JSON.parse(localStorage.getItem("Contains_Alpha_3")),
            Contains_Alpha_4: JSON.parse(localStorage.getItem("Contains_Alpha_4")),
            Contains_Alpha_5: JSON.parse(localStorage.getItem("Contains_Alpha_5")),
            Contains_Numeric_1: JSON.parse(localStorage.getItem("Contains_Numeric_1")),
            Contains_Numeric_2: JSON.parse(localStorage.getItem("Contains_Numeric_2")),
            Contains_Numeric_3: JSON.parse(localStorage.getItem("Contains_Numeric_3")),
            Contains_Numeric_4: JSON.parse(localStorage.getItem("Contains_Numeric_4")),
            Contains_Numeric_5: JSON.parse(localStorage.getItem("Contains_Numeric_5")),
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

    isSelected(e) {
        if(this.state[e.target.name]) {
            return this.state[e.target.name];
        }

        return '0';
    }

    render() {
        // $('.setup').width($('.form').css('width'));
        // $('.setup').css('top', $('.header').css('height'));

        
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
                          <h4 className='eklik-page-title'>Account Masking Information (optional but strongly suggested)</h4>
                        
                          <p className='form-comment'>Describe the Structure(s) of the Account Numbers Consumers Might See on Their Statements/Invoices, aka the "Account Mask", in the Chart Below</p>
                          <br/> 
                          <p className='form-comment'>Indicate All Acceptable Variations</p>
                       
                         
                            <div className="instructions-container">
                            
                            <p className='instruction sample-account-mask-key'><b>Sample Account Mask Key:</b></p>
                            
                            <p className='instruction'>* = Uppercase Alpha</p>
                            
                            <p className='instruction'># = Numeric</p>
                            
                            <p className='instruction'>@ = Uppercase Alpha or Numeric</p>
                            
                            <p className='instruction'>! = Special Characters, Upper & Lowercase Alpha or Numeric</p>
                            </div>
                            
                        </Form>
                    </div>
            </div>
            </React.Fragment>
    )};
}

export default eKlik3;
                    

                              
                                  
                  
                          