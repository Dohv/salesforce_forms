const Joi = require('joi');
const request = require('request');
const { fields } = require('../helpers/sfFormFields');
// var jsforce = require('jsforce');
// var conn = new jsforce.Connection({
//   loginUrl : 'https://test.salesforce.com'
// });

const getSFTokenAPI = {
  url: 'https://test.salesforce.com/services/oauth2/token', 
  method: 'POST',
  form: {
        grant_type: process.env.GRANT_TYPE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        username: process.env.SF_USERNAME,
        password: process.env.SF_PASSWORD
      }
}

module.exports = {
  getSFTokenAPI,
  
  getAccountIdSFQuery: (url, email, token) => {
    return {
      url: `${url}/services/data/v43.0/query?q=select+account.id+FROM+Contact+WHERE+email+='${email}'`,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  },

  getFormDataSFQuery: (url, accountId, token, recordType) => {
    //console.log(recordType);
    return {
      url: `${url}/services/data/v43.0/query?q=select+${fields}+FROM+On_Boarding_Forms__c+WHERE+Account_Name__c+='${accountId}'+AND+RecordTypeId+='${recordType}'`,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if(result.error) {
        
        return res.status(400).json(result.error);
      }
      
      if(!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },

  validateEmailInSF: async (req, res, next) => {
    console.log('in validateEmailInSF function');
     const { email } = req.body;
      //console.log(email);
      await request(getSFTokenAPI, (error, response, body) => {
        if(error) {
          console.log('sf token error', error);
        } else {
          const result = JSON.parse(body);
          const url = result.instance_url;
          const sfToken = result.access_token;
          console.log('got SF token');
           request({
            url: `${url}/services/data/v43.0/query?q=select+name,id,account.name,account.id,account.type,account.products__c+FROM+Contact+WHERE+email+='${email}'`,
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + sfToken
            }
            }, (verror, vresponse, vbody) => {
              if(verror) {
                console.log('sf email error', verror);
              } else {
                const vresult = JSON.parse(vbody);
                if(vresult.totalSize === 0) {
                  //return res.json({message: 'There is no email for that account.'});
                  return res.json({message: 'There is no account with that email'})
                } else {
                    //console.log(vresult.records[0]);
                   res.locals.contactName = vresult.records[0].Name
                   res.locals.accountName = vresult.records[0].Account.Name; 
                   res.locals.accountId = vresult.records[0].Account.Id;
                   res.locals.accountType = vresult.records[0].Account.Type;
                   res.locals.accountProducts = vresult.records[0].Account.Products__c.split(';');
                   next();
                }
              }
          });
        }
      });
  }
  
}
        
                

    

    



