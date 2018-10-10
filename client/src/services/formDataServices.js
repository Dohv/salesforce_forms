import axios from 'axios';


const formDataServices = {
  getFormDataFromServer: async (accountId, formType) => {
    //console.log(formType);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token")
    }
    try {
      let formData = await axios.post('/api/form', { accountId, formType }, {"headers": headers});
      if(formData.data.data === 0) {
       try {
          await axios.post('/api/new', { accountId, formType }, {"headers": headers});
          formData = await axios.post('/api/form', { accountId, formType }, {"headers": headers});
        } catch (error) {
          console.log('create new knp form error' ,error);
        }
      } 
      if (formData) {
        //console.log(formData.data.data);
        const data = formData.data.data;
        const fields = Object.keys(formData.data.data);
        fields.map((field) => {
          if(data[field] === null) {
            data[field] = '';
          }
          if(field.indexOf('__c') !== -1) {
            const format = field.slice(0, field.indexOf('__c'));
            localStorage.setItem(format, data[field]);
          } else {
            localStorage.setItem(field, data[field]);
          }
        })
       } 
    } catch(error) {
      console.log("this is getFormData error:", error);
    }
  },

  updateFormData: async (accountId, sfFieldName, fieldValue, formType) => {
    //console.log({accountId, sfFieldName, fieldValue, formType})
    sfFieldName = sfFieldName + '__c';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token")
    }

    await axios.post('/api/update', { accountId, sfFieldName, fieldValue, formType }, {"headers": headers});
  },

  getClientsAPI: async (accountId) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
      const clients = await axios.post('/api/clients', { accountId }, { "headers": headers });
      if(clients) {
        //console.log(clients.data.result);
        localStorage.setItem("clients", JSON.stringify(clients.data.result));
      }
    } catch (error) {
      console.log('getClientsAPI error', error);
    }
  },

  searchClients: async (accountName) => {

  }


}

export default formDataServices