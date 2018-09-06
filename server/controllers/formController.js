const request = require('request');
const { getSFTokenAPI, getAccountIdSFQuery, getFormDataSFQuery } = require('../helpers/routeHelpers');

module.exports = {
  getClients: async (req, res, next) => {
    const { accountId } = req.body;
    await request(getSFTokenAPI, (error, response, body) => {
      if(error) {
        console.log('sf token error', error);
      } else {
        const result = JSON.parse(body);
        const url = result.instance_url;
        const sfToken = result.access_token;
        request({
          url: `${url}/services/data/v43.0/query?q=select+id,name+FROM+Account+WHERE+ParentId+='${accountId}'+ORDER+BY+Account.Name
          `,
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sfToken,
          }
        }, (verror, vresponse, vbody) => {
          if(verror) {
            console.log('sf get clients error', verror);
          } else {
            const result = JSON.parse(vbody);
            res.json({result: result.records})
          }
        })
      }
    })
  },

  getFormDataFromSF: async (req, res, next) => {
    let { email, formType } = req.body;
    switch(formType) {
      case 'KlikNPay':
        formType = process.env.KLIKNPAY_RECORD_TYPE;
        break;
      case 'eKlik':
        formType = process.env.EKLIK_RECORD_TYPE;
        break;
      case 'Remit':
        formType = process.env.REMIT_RECORD_TYPE;
        break;
      case 'Print Services':
        formType = process.env.PRINT_SERVICES_RECORD_TYPE;
        break;
      case 'Remit Station':
        formType = process.env.REMIT_STATION_RECORD_TYPE;
        break;
      default:
      console.log('error with formType in formController.getFormDataFromSF');
    }
    await request(getSFTokenAPI, (error, response, body) => {
      if(error) {
        console.log('sf token error', error);
      } else {
        const result = JSON.parse(body);
        const url = result.instance_url;
        const sfToken = result.access_token;
         request(getAccountIdSFQuery(url, email, sfToken), (verror, vresponse, vbody) => {
            if(verror) {
              console.log('sf email error', verror);
            } else {
              const vresult = JSON.parse(vbody);
              const accountId = vresult.records[0].Account.Id; 
              request(getFormDataSFQuery(url, accountId, sfToken, formType), (werror, wresponse, wbody) => {
                  if(werror) {
                    console.log('sf form data error', werror);
                  } else {
                  const wresult = JSON.parse(wbody);
                  if(wresult.totalSize === 0) {
                    res.json({ data: wresult.totalSize });
                    next();
                  } else {
                    //console.log(wresult);
                    res.json({ data: wresult.records[0] });
                    next();
                  }
                }
              })
            }
        });
      }
    });
  },

  postNewForm: async (req, res, next) => {
    let { email, formType } = req.body;
    let recordType;
    switch(formType) {
      case 'KlikNPay':
        recordType = process.env.KLIKNPAY_RECORD_TYPE;
        break;
      case 'eKlik':
        recordType = process.env.EKLIK_RECORD_TYPE;
        break;
      case 'Remit':
        recordType = process.env.REMIT_RECORD_TYPE;
        break;
      case 'Print Services':
        recordType = process.env.PRINT_SERVICES_RECORD_TYPE;
        break;
      case 'Remit Station':
        recordType = process.env.REMIT_STATION_RECORD_TYPE;
        break;
      default:
      console.log('error with formType in formController.getFormDataFromSF');
    }
    await request(getSFTokenAPI, (error, response, body) => {
      if(error) {
        console.log('sf token error', error);
      } else {
        const result = JSON.parse(body);
        const url = result.instance_url;
        const sfToken = result.access_token;
        request(getAccountIdSFQuery(url, email, sfToken), (berror, bresponse, bbody) => {
          if(berror) {
            console.log('sf email error', berror);
          } else {
            const bresult = JSON.parse(bbody);
            const accountId = bresult.records[0].Account.Id;
            request({
                url: `${url}/services/data/v43.0/composite/tree/on_boarding_forms__c`,
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer ' + sfToken,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "records": [{
                    "attributes": {"type": "on_boarding_forms__c", "referenceId": "ref1"},
                    "Name": formType,
                    "RecordTypeId": recordType,
                    "Account_Name__c": accountId
                  }]
                })     
            }, (werror, wresponse, wbody) => {
              if(werror) {
                console.log('sf form data error', werror);
              } else {
                const result = JSON.parse(wbody)
              console.log({success: 'new form created' });
              res.json({ success: 'new form created' });
             }
            })
           }
         })
      }
    })    
  },

  updateFormData: async (req, res, next) => {
    let { accountId, sfFieldName, fieldValue, formType } = req.body;
    switch(formType) {
      case 'KlikNPay':
        formType = process.env.KLIKNPAY_RECORD_TYPE;
        break;
      case 'eKlik':
        formType = process.env.EKLIK_RECORD_TYPE;
        break;
      case 'Remit':
        formType = process.env.REMIT_RECORD_TYPE;
        break;
      case 'Print Services':
        formType = process.env.PRINT_SERVICES_RECORD_TYPE;
        break;
      case 'Remit Station':
        formType = process.env.REMIT_STATION_RECORD_TYPE;
        break;
      default:
      console.log('error with formType in formController.getFormDataFromSF');
    }
    await request(getSFTokenAPI, (error, response, body) => {
      if(error) {
        console.log('sf token error', error);
      } else {
        const result = JSON.parse(body);
        const url = result.instance_url;
        const sfToken = result.access_token;
        request({
          url: `${url}/services/data/v43.0/query?q=select+id+FROM+On_Boarding_Forms__c+WHERE+Account_Name__c+='${accountId}'+AND+RecordTypeId+='${formType}'`,
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sfToken,
          }
        }, (berror, bresponse, bbody) => {
          if(berror) {
            console.log('update form error', berror);
          } else {
            const result = JSON.parse(bbody);
            const formId = result.records[0].Id;
            request({
              url: 'https://cs77.salesforce.com/services/data/v43.0/composite/sobjects',
              method: 'PATCH',
              headers: {
                      'Authorization': 'Bearer ' + sfToken,
                      'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                      "records": [{
                        "attributes": {"type": "on_boarding_forms__c"},
                        "id": formId,
                        "Name": "KlikNPay",
                        "RecordTypeId": formType,
                        "Account_Name__c": accountId,
                        [sfFieldName]: fieldValue
                      }]   
              })
            }, (terror, tresponse, tbody) => {
              if(terror) {
                console.log('sf form data error', werror);
              } else {
                const result = JSON.parse(tbody);
                console.log({success: 'updated form' });
                res.json({ result });
              }
            })
           }
         })
      }
    })    
  }
}
