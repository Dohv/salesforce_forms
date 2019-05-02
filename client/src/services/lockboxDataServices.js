import axios from 'axios';


const lockboxDataServices = {
    getLockboxDataFromServer: async (newImplementationId) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          }
          try {
              let lockboxData = await axios.post('/lockbox/getData', { newImplementationId }, {"headers": headers });
              if(lockboxData) {
                  console.log({lockboxData})
                  const data = lockboxData.data.data;
                const fields = Object.keys(lockboxData.data.data);
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
              console.log("this is getlockboxDataFromServer error" , error);
          } 
    },

    updateLockboxData: async (newImplementationId, sfFieldName, fieldValue) => {
        if(sfFieldName === 'Name' || sfFieldName === 'Website' || sfFieldName === 'Phone') {
            sfFieldName = sfFieldName
        } else {
            sfFieldName = sfFieldName + '__c'
        }
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json'
        }
    
        await axios.post('/lockbox/update', { newImplementationId, sfFieldName, fieldValue, }, {"headers": headers});
      },
};

export default lockboxDataServices;