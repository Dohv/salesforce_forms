import React, { Component } from 'react';
import { Row, Input, Icon } from 'react-materialize'


class KlikNPay extends Component {
    constructor(props) {
        super(props);
        this.state = {value: false}

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.checked})
    }
    render () {
        return (

            <div>
                <div className='container'>
                    <div className='col s12'>
                        <h2>Protected Component 3</h2>
                        <form className='col s12'>
                            <Row>
                            <Input s={6} name='on' type='date' onChange={function(e, value) {}}  label='Proposed go live date'>
                            <Icon>calendar_today</Icon>
                            </Input>
                            </Row>
                            <Row>
                            <p className='form-comment'>Are you currently set up on Klik Remit?</p>
                            <div className="switch"><label>No<input type = "checkbox" />
                            <span className="lever"></span>Yes</label></div> 
                            </Row>
                            <h4 >Customer Profile</h4>
                            <Row>
                                <Input s={6} label="Company Name" /> 
                            </Row>
                            <Row >
                                <p className='form-comment'>Please list the accounts or provide your entity list:</p>
                                <Input s={6} label="Account Number" /> 
                            </Row>
                            <Row>
                                <Input s={6} label="Account Name" />
                                <Input s={6} label="Billing Account Number" />
                            </Row> 
                            <Row>
                                <Input s={5} label="Address" />
                                <Input s={3} label="City" />
                                <Input s={2} label="State" />
                                <Input s={2} label="Zip Code" />
                            </Row>
                            <Row>
                                <Input s={4} label="Contact Name" />
                                <Input s={4} label="Phone Number" />
                                <Input s={4} label="Email" />
                            </Row>
                            <Row>
                                <Input s={3} label="EIN/TIN" />
                                <Input s={3} label="Entity Short Name" />
                                <Input s={3} label="Website" />
                                <Input s={3} label="NAICS Code" />
                            </Row>
                            <h4>Billing & Bank Depository Information</h4>
                            <h5>Invoice Preference</h5>
                            <Row>
                                <Input name='group1' type='checkbox' value='red' label='Paper' />
                                <Input name='group1' type='checkbox' value='red' label='Digital' />
                                <p>(Provide e-mail distribution list if different from above.)</p>
                            </Row>
                            <Row>
                                <Input s={3} label="Bank #1 Name" />
                                <Input s={3} label="Email Distribution Address" />
                                <Input s={3} label="Admin. Contact Name" />
                                <Input s={3} label="Phone Number" />
                            </Row>
                            <Row>
                                <Input name='group1' type='checkbox' value='red' label='ICL Image File' />
                            </Row>
                        </form>
                    </div>
                </div>

            </div>
    )};
};


export default KlikNPay;