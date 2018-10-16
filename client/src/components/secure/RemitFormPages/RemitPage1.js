import React, { Component } from 'react';
import { Row, Input, Icon } from 'react-materialize'
import formDataServices from '../../../services/formDataServices';


class Remit1 extends Component {
    constructor(props) {
        super(props);
        this.state ={
            isLoggedIn: this.props.isLoggedIn,
            isSaving: false,
            Remit_Target_Go_Live_Date: '',
            Remit_Today_s_Date: '',
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
            Remit_Target_Go_Live_Date: localStorage.getItem("Remit_Target_Go_Live_Date"),
            Remit_Today_s_Date: localStorage.getItem("Remit_Today_s_Date"),
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

    dateFormat(string, stateName) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let formatedDate = [];
        
        if(string.indexOf(',') !== -1) {
            const splitStr = string.split(' ');
            const monthNumber = months.indexOf(splitStr[1].slice(0, -1)) + 1;
            formatedDate.push(splitStr[2])
            formatedDate.push('-');
            monthNumber < 10 ? formatedDate.push(`0${monthNumber}`) : formatedDate.push(monthNumber);
            formatedDate.push('-');
            formatedDate.push(splitStr[0]);
            let result = formatedDate.join('');

            return result;
        }
        return this.state[stateName];
    }

    phoneNumberFormat(s) {
        if(s.length >= 9) {
            var s2 = (""+s).replace(/\D/g, '');
            var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
            return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
        }

        return this.state.phone_number;

    }

    isSelected(e) {
        if(this.state[e.target.name]) {
            return this.state[e.target.name];
        }

        return '0';
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
                        <form className='col s12 form'>
                            <Row>
                                <Input s={6} className='datepicker' name='Remit_Target_Go_Live_Date' type='date' onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} value={this.dateFormat(this.state.Remit_Target_Go_Live_Date, 'Remit_Target_Go_Live_Date')} label='Proposed go live date'>
                                <Icon>calendar_today</Icon>
                                </Input>
                                <Input s={6} className='datepicker' name='Remit_Today_s_Date' type='date' onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}} value={this.dateFormat(this.state.Remit_Today_s_Date, 'Remit_Today_s_Date')} label="Today's date">
                                <Icon>calendar_today</Icon>
                                </Input>
                            </Row>
                        </form>
                    
                </div>

            </div>
            </React.Fragment>
    )};
}

export default Remit1;