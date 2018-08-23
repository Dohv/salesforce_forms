const request = require('request');

module.exports = {
  getKlikNPayFormDataFromSF: async (req, res, next) => {
    const { email } = req.body;
    await request({
      url: 'https://test.salesforce.com/services/oauth2/token', 
      method: 'POST',
      form: {
        grant_type: process.env.GRANT_TYPE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      }
    }, (error, response, body) => {
      if(error) {
        console.log('sf token error', error);
      } else {
        const result = JSON.parse(body);
        const url = result.instance_url;
        const sfToken = result.access_token;
         request({
          url: `${url}/services/data/v43.0/query?q=select+account.id+FROM+Contact+WHERE+email+='${email}'`,
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sfToken
          }
          }, (verror, vresponse, vbody) => {
            if(verror) {
              console.log('sf email error', verror);
            } else {
              const vresult = JSON.parse(vbody);
              const accountId = vresult.records[0].Account.Id 
              request({
                url: `${url}/services/data/v43.0/query?q=select+Account_Name__c,Account_Number__c,Address__c,Billing_Account_Number__c,City__c,Company_Name__c,Contact_Name__c,Email__c	,isKlikRemit__c,Phone_Number__c,State__c,Target_Go_Live_Date__c,Zip_Code__c+FROM+On_Boarding_Forms__c+WHERE+Account_Name__c+='${accountId}'+AND+RecordTypeId+='${process.env.KLIKNPAY_RECORD_TYPE}'`,
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + sfToken
                }
                }, (werror, wresponse, wbody) => {
                  if(werror) {
                    console.log('sf form data error', werror);
                  } else {
                  const wresult = JSON.parse(wbody);
                  res.json({ data: wresult.records[0] });
                  next();
                  }
              })
            }
        });
      }
    });
  },

  postNewForm: async (req, res, next) => {

  },

  updateFormData: async (req, res, next) => {

  }
}

