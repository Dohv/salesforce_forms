import React, { Component } from 'react';
import { Row, Input, Icon } from 'react-materialize';
import formDataServices from '../../../services/formDataServices';
import formattingServices from '../../../services/formattingServices';

class RemitPage1 extends Component {
  constructor(props) {
      super(props);
      this.state = {}; 
  }

  componentDidMount() {
    this.getFormData();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async getFormData() {
    await formDataServices.getFormDataFromServer(localStorage.getItem('sfAccountId'), localStorage.getItem('selectedForm'));
    
    window.Materialize.updateTextFields();
  }

  render() {
    const styles = {
      backgroundColor: 'grey',
      width: '100vw'
    }

    return(
      <div className='formPages'>
        <div className='container'>
          <form>
            <Row>
              <Input s={6} name='account_name' label="Account Name" onChange={this.handleInputChange} />
              <Input s={6} name='billing_account_number' label="Billing Account Number" onChange={this.handleInputChange} />
            </Row>
          </form>
        </div>
      </div> 
    )
  }
}

export default RemitPage1;