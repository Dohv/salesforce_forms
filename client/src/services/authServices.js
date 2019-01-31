import axios from 'axios';
import {isArray} from 'util';

const authServices = {

  isAuthenticated: () => {
    const result = localStorage.getItem('token');
    if(result) {
      return true;
    } else {
      return false;
    }
  },

  logIn: async (email, password) => {
    //console.log({email, password});
    try {
      let login = await axios.post('/users/signin', {
         email,
         password
       })
       if (login) {
        const data = login.data;
        const fields = Object.keys(login.data);
        fields.map((field) => {
          if(data[field] === null) {
            data[field] = '';
          }

          if(field.indexOf('__c') !== -1) {
            const format = field.slice(0, field.indexOf('__c'));
            localStorage.setItem(format, data[field]);
          } else if(isArray(data[field])) {
            localStorage.setItem(field, JSON.stringify(data[field]));
          } else {
            localStorage.setItem(field, data[field]);
          }
        })
        //need to store the User's account name for the use case that the user is a Channel partner 
         localStorage.setItem('userAccountName', login.data.sfAccountName);
         localStorage.setItem('userAccountId', login.data.sfAccountId);
         localStorage.setItem('userAccountProducts', JSON.stringify(login.data.sfAccountProducts));
       }
    } catch(error) {
      console.log("this is login error:", error);
    }
  },

  logOut: async (id) => {
    try {
      await axios.post('/users/logout',{ id });
      localStorage.clear();
    } 
    catch (error) {
      console.log("this is logout error:", error);
    }
  }
}

export default authServices;