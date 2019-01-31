import axios from 'axios';


const formDataServices = {
  getFormDataFromServer: async (accountId, formType, newImplementationId) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token")
    }
    try {
      let formData = await axios.post('/api/form', { accountId, formType, newImplementationId }, {"headers": headers});
      if(formData.data.data === 0) {
       try {
          await axios.post('/api/new', { accountId, formType, newImplementationId }, {"headers": headers});
          formData = await axios.post('/api/form', { accountId, formType, newImplementationId }, {"headers": headers});
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
          } else if(field === 'Id') {
            localStorage.setItem('onBoardingFormId', data[field]);
          } else {
            localStorage.setItem(field, data[field]);
          }
        })
       } 
    } catch(error) {
      console.log("this is getFormData error:", error);
    }
  },

  updateFormData: async (accountId, sfFieldName, fieldValue, formType, newImplementationId) => {
    //console.log({accountId, sfFieldName, fieldValue, formType})
    sfFieldName = sfFieldName + '__c';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token")
    }

    await axios.post('/api/update', { accountId, sfFieldName, fieldValue, formType, newImplementationId }, {"headers": headers});
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
  uploadFile: async (newImplementationId, fileName, file) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
      await axios.post('/api/fileUpload', {newImplementationId, fileName, file}, { "headers": headers });   
    } catch (error) {
      console.log('uploadFile error', error);
    }
  }
}

export default formDataServices;