import axios from 'axios';


const formDataServices = {
  getFormDataFromServer: async (email) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token")
    }
    try {
      let formData = await axios.post('/api/form', { email }, {"headers": headers});

       if (formData) {
        localStorage.setItem("isKlikRemit", formData.data.data.isKlikRemit__c);
        localStorage.setItem("Account_Number", formData.data.data.Account_Number__c);
        localStorage.setItem("Address", formData.data.data.Address__c);
        localStorage.setItem("Billing_Account_Number", formData.data.data.Billing_Account_Number__c);
        localStorage.setItem("City", formData.data.data.City__c);
        localStorage.setItem("Company_Name", formData.data.data.Company_Name__c);
        localStorage.setItem("Contact_Name", formData.data.data.Contact_Name__c);
        localStorage.setItem("Email", formData.data.data.Email__c);
        localStorage.setItem("Phone_Number", formData.data.data.Phone_Number__c);
        localStorage.setItem("State", formData.data.data.State__c);
        localStorage.setItem("Target_Go_Live_Date", formData.data.data.Target_Go_Live_Date__c);
        localStorage.setItem("Zip_Code", formData.data.data.Zip_Code__c);
       } 
    } catch(error) {
      console.log("this is KlikNPay form data error:", error);
    }
  }
}

export default formDataServices