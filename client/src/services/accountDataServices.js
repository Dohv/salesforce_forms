import axios from 'axios';


const accountDataServices = {
    getAccountDataFromServer: async (accountId) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          }
          try {
              let accountData = await axios.post('/account/getData', { accountId }, {"headers": headers });
              if(accountData) {
                  const data = accountData.data.data;
                const fields = Object.keys(accountData.data.data);
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
              console.log("this is getAccountData error" , error);
          } 
    },

    updateAccountData: async (accountId, sfFieldName, fieldValue) => {
        console.log({sfFieldName})
        if(sfFieldName === 'Name' || sfFieldName === 'Website' || sfFieldName === 'Phone') {
            sfFieldName = sfFieldName
        } else {
            sfFieldName = sfFieldName + '__c'
        }
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json'
        }
    
        await axios.post('/account/update', { accountId, sfFieldName, fieldValue, }, {"headers": headers});
      },
};

export default accountDataServices;