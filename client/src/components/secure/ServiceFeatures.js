import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Col, Row, fieldset, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar, Button, Radio } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import lockboxDataServices from '../../services/lockboxDataServices';
import $ from 'jquery';

class ServiceFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            isSaving: false,
            Data_Transmission_Data_Output: localStorage.getItem("Data_Transmission_Data_Output") ? localStorage.getItem("Data_Transmission_Data_Output") : false,
            Lockbox_File_Update_Frequency: '',
            Lockbox_File_Format: '',
            Lockbox_File_Delivery_Method: '',
            Image_File_Transmission: localStorage.getItem("Image_File_Transmission") ? localStorage.getItem("Image_File_Transmission") : false,
            Stop_File_Processing: localStorage.getItem("Stop_File_Processing") ? localStorage.getItem("Stop_File_Processing") : false,
            Stop_File_Update_Frequency: '',
            Stop_File_Format: '',
            Stop_File_Delivery_Method: '',
            Soft_Stop_File_reject_item_to_web: localStorage.getItem("Soft_Stop_File_reject_item_to_web") ? localStorage.getItem("Soft_Stop_File_reject_item_to_web") : false,
            Billing_File_Maintenance: localStorage.getItem("Billing_File_Maintenance") ? localStorage.getItem("Billing_File_Maintenance") : false,
            Billing_File_Update_Frequency: '',
            Billing_File_Format: '',
            Billing_File_Delivery_Method: '',
            Online_Exception_Decisioning: localStorage.getItem("Billing_File_Maintenance") ? localStorage.getItem("Billing_File_Maintenance") : false,
            Credit_Card_Processing: localStorage.getItem("Credit_Card_Processing") ? localStorage.getItem("Credit_Card_Processing") : false,
            Notes_Feature: localStorage.getItem("Notes_Feature") ? localStorage.getItem("Notes_Feature") : false,
            PDF_Image_Download: localStorage.getItem("PDF_Image_Download") ? localStorage.getItem("PDF_Image_Download") : false,
            Number_of_days_to_hold_before_reject: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }


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
        await lockboxDataServices.updateLockboxData(localStorage.getItem("NewImplementationID"), name, value);
        this.setState({isSaving: false});
    }

    async getFormData() {
        await lockboxDataServices.getLockboxDataFromServer(localStorage.getItem('NewImplementationID'));
       if(this._isMounted) {
          this.setState({
            Data_Transmission_Data_Output: JSON.parse(localStorage.getItem("Data_Transmission_Data_Output")),
            Lockbox_File_Update_Frequency: localStorage.getItem("Lockbox_File_Update_Frequency"),
            Lockbox_File_Format: localStorage.getItem("Lockbox_File_Format"),
            Lockbox_File_Delivery_Method: localStorage.getItem("Lockbox_File_Delivery_Method"),
            Image_File_Transmission: JSON.parse(localStorage.getItem("Image_File_Transmission")),
            Stop_File_Processing: JSON.parse(localStorage.getItem("Stop_File_Processing")),
            Stop_File_Update_Frequency: localStorage.getItem("Stop_File_Update_Frequency"),
            Stop_File_Format: localStorage.getItem("Stop_File_Format"),
            Stop_File_Delivery_Method: localStorage.getItem("Stop_File_Delivery_Method"),
            Soft_Stop_File_reject_item_to_web: JSON.parse(localStorage.getItem("Soft_Stop_File_reject_item_to_web")),
            Billing_File_Maintenance: JSON.parse(localStorage.getItem("Billing_File_Maintenance")),
            Billing_File_Update_Frequency: localStorage.getItem("Billing_File_Update_Frequency"),
            Billing_File_Format: localStorage.getItem("Billing_File_Format"),
            Billing_File_Delivery_Method: localStorage.getItem("Billing_File_Delivery_Method"),
            Online_Exception_Decisioning: JSON.parse(localStorage.getItem("Online_Exception_Decisioning")),
            Credit_Card_Processing: JSON.parse(localStorage.getItem("Credit_Card_Processing")),
            Notes_Feature: JSON.parse(localStorage.getItem("Notes_Feature")),
            PDF_Image_Download: JSON.parse(localStorage.getItem("PDF_Image_Download")),
            Number_of_days_to_hold_before_reject: localStorage.getItem("Number_of_days_to_hold_before_reject"),
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
    

    render() { 

        let isData_Transmission_Data_Output = this.state.Data_Transmission_Data_Output ? true : false;
        let isImage_File_Transmission = this.state.Image_File_Transmission ? true : false;
        let isStop_File_Processing = this.state.Stop_File_Processing ? true : false;
        let isSoft_Stop_File_reject_item_to_web = this.state.Soft_Stop_File_reject_item_to_web ? true : false;
        let isBilling_File_Maintenance = this.state.Billing_File_Maintenance ? true : false;
        let isOnline_Exception_Decisioning = this.state.Online_Exception_Decisioning ? true : false;
        let isCredit_Card_Processing  = this.state.Credit_Card_Processing ? true : false;
        let isNotes_Feature = this.state.Notes_Feature ? true : false;
        let isPDF_Image_Download = this.state.PDF_Image_Download ? true : false;
      
        let savingStatus = this.state.isSaving ? 
        <div className="saving-anime">
            <div className="lds-ripple"><div></div><div></div></div>
            <p>saving</p> 
        </div> : '';

        let nextPage = (this.props.currentFormPage + 1).toString();
        let path = this.props.match.path;
        const currPath = path.slice(0, path.lastIndexOf('/'))
        const nextButton = this.props.currentFormPage === 3 ? '' : <Link className='FFLink next ripple' onClick={() => { console.log({currPath, nextPage}); this.props.handleNextFormPage(); this.props.handleNextRouteChangeAnimation(); window.scrollTo(0, 0); this.props.updateClass(this.props.currentFormPage + 1) }} to={`${currPath}/${nextPage}`}>Next<i className="fas fa-caret-right"></i></Link>;

        return (
            <React.Fragment>
            <div className='behindForm'>
            {savingStatus}
                <div className='container'>
                    <Form className='form' id='service-features'>
                        <h4 className='eklik-page-title'>Service Features</h4>
                        <Row class="underline">
                            <Col xs={12} sm={6} md={6}>
                                <FormGroup>
                                    <Checkbox name='Data_Transmission_Data_Output' checked={isData_Transmission_Data_Output} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                        Data Transmission Data Output
                                    </Checkbox>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col xs={12} sm={6} md={6} className='privPub'></Col>
                            <Col xs={12} sm={6} md={6} className='privPub'>
                                <ControlLabel>Update Frequency</ControlLabel>
                                <FormGroup>
                                        <FormControl componentClass="select" name='Lockbox_File_Update_Frequency' value={this.state.Lockbox_File_Update_Frequency} onChange={(e) => {this.handleInputChange(e); this.handleSave(e)}}>
                                        <option value=''>Choose</option>
                                            <option value='Daily'>Daily</option>
                                            <option value='Weekly'>Weekly</option>
                                            <option value='Monthly'>Monthly</option>
                                        </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col xs={12}>
                                {nextButton} 
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            </React.Fragment>
    )};
}

export default ServiceFeatures;