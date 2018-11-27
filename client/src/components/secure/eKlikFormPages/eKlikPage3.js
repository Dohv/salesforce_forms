import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Row, Input } from 'react-materialize'
import formDataServices from '../../../services/formDataServices';


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
        let isContainsAlpha1 = this.state.Contains_Alpha_1 ? true : false;
        let isContainsAlpha2 = this.state.Contains_Alpha_2 ? true : false;
        let isContainsAlpha3 = this.state.Contains_Alpha_3 ? true : false;
        let isContainsAlpha4 = this.state.Contains_Alpha_4 ? true : false;
        let isContainsAlpha5 = this.state.Contains_Alpha_5 ? true : false;
        let isContainsNumeric1 = this.state.Contains_Numeric_1 ? true : false;
        let isContainsNumeric2 = this.state.Contains_Numeric_2 ? true : false;
        let isContainsNumeric3 = this.state.Contains_Numeric_3 ? true : false;
        let isContainsNumeric4 = this.state.Contains_Numeric_4 ? true : false;
        let isContainsNumeric5 = this.state.Contains_Numeric_5 ? true : false;
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
                          <h4 >Account Masking Information (optional - strongly suggested)</h4>
                          <Row>
                          <p className='form-comment'>Describe the Structure(s) of the Account Numbers Consumers Might See on Their Statements/Invoices, aka the "Account Mask", in the Chart Below</p>
                          <br/> 
                          <p className='form-comment'>Indicate All Acceptable Variations</p>
                          </Row>
                          <Row>
                            <div className="instructions-container">
                            
                            <p className='instruction sample-account-mask-key'><b>Sample Account Mask Key:</b></p>
                            
                            <p className='instruction'>* = Uppercase Alpha</p>
                            
                            <p className='instruction'># = Numeric</p>
                            
                            <p className='instruction'>@ = Uppercase Alpha or Numeric</p>
                            
                            <p className='instruction'>! = Special Characters, Upper & Lowercase Alpha or Numeric</p>
                            </div>
                            
                          </Row>
                              <div className="table">
                                <div className="row-container">
                                  <div className="th th-left">Account Mask(s)</div>
                                  <div className="switch-container">
                                      <div className="th th-right">Scanline contain Alpha’s? (Y/N)</div>
                                      <div className="th th-right">Scanline contain Numerics? (Y/N)</div> 
                                  </div>
                                </div>
                              </div> 
                          <Row>
                            <div className="mask-details">

                            <div className="th th-left">
                              <Input className='maskInput' name='Mask_1' label="Mask 1" value={this.state.Mask_1} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </div>
                            <div className="switch-container margin-right">
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Alpha_1' checked={isContainsAlpha1} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Numeric_1' checked={isContainsNumeric1} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>

                            </div>
                            </div>
                          </Row>
                          <Row>
                            <div className="mask-details">

                            <div className="th th-left">
                              <Input className='maskInput' name='Mask_2' label="Mask 2" value={this.state.Mask_2} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </div>
                            <div className="switch-container margin-right">
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Alpha_2' checked={isContainsAlpha2} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Numeric_2' checked={isContainsNumeric2} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>

                            </div>
                            </div>
                          </Row>
                          <Row>
                            <div className="mask-details">

                            <div className="th th-left">
                              <Input className='maskInput' name='Mask_3' label="Mask 3" value={this.state.Mask_3} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </div>
                            <div className="switch-container margin-right">
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Alpha_3' checked={isContainsAlpha3} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Numeric_3' checked={isContainsNumeric3} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>

                            </div>
                            </div>
                          </Row>
                          <Row>
                            <div className="mask-details">

                            <div className="th th-left">
                              <Input className='maskInput' name='Mask_4' label="Mask 4" value={this.state.Mask_4} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </div>
                            <div className="switch-container margin-right">
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Alpha_4' checked={isContainsAlpha4} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Numeric_4' checked={isContainsNumeric4} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>

                            </div>
                            </div>
                          </Row>
                          <Row>
                            <div className="mask-details">

                            <div className="th th-left">
                              <Input className='maskInput' name='Mask_5' label="Mask 5" value={this.state.Mask_5} onChange={this.handleInputChange} onBlur={this.handleSave} /> 
                            </div>
                            <div className="switch-container margin-right">
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Alpha_5' checked={isContainsAlpha5} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>
                              <div className="maskSwitch switch"><label className='yesNo'>No<input type="checkbox" name='Contains_Numeric_5' checked={isContainsNumeric5} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} />
                                  <span className="lever"></span>Yes</label></div>

                            </div>
                            </div>
                          </Row>
                        </form>
                    </div>
            </div>
            </React.Fragment>
    )};
}

export default eKlik3;
                    

                              
                                  
                  
                          