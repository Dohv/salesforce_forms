import axios from 'axios';


const formDataServices = {
  getFormDataFromServer: async (email) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token")
    }
    try {
      let formData = await axios.post('/api/form', { email }, {"headers": headers});
      if(formData.data.data === 0) {
       try {
          await axios.post('/api/new', { email }, {"headers": headers});
          localStorage.setItem("isKNPForm", true);
        } catch (error) {
          console.log('create new knp form error' ,error);
        }
      }  
      if (formData) {
        const data = formData.data.data;
        const fields = Object.keys(formData.data.data);
        fields.map((field) => {
          if(data[field] === null) {
            data[field] = '';
          }
          if(field.indexOf('__c') !== -1) {
            const format = field.slice(0, field.indexOf('__c'));
            localStorage.setItem(format, data[field])
          } else {
            localStorage.setItem(field, data[field])
          }
        })
       } 
    } catch(error) {
      console.log("this is KlikNPay form data error:", error);
    }
  }
}

export default formDataServices