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
          url: `${url}/services/data/v43.0/query?q=select+id,name, products__c+FROM+Account+WHERE+ParentId+='${accountId}'+ORDER+BY+Account.Name
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
            res.json({result: result.records});
          }
        })
      }
    })
  },

  getFormDataFromSF: async (req, res, next) => {
    console.log('in getFormDataFromSF');
    let { accountId, formType, newImplementationId } = req.body;
    //console.log({newImplementationId})
    switch(formType) {
      case 'KlikNPay':
        formType = process.env.KLIKNPAY_RECORD_TYPE;
        break;
      case 'Catch':
        formType = process.env.CATCH_RECORD_TYPE;
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
        request(getFormDataSFQuery(url, accountId, sfToken, formType, newImplementationId), (werror, wresponse, wbody) => {
          if(werror) {
            console.log('sf form data error', werror);
          } else {
            const wresult = JSON.parse(wbody);
            if(wresult.totalSize === 0) {
              res.json({ data: wresult.totalSize });
              next();
            } else {
              console.log({wresult})
              res.json({ data: wresult.records[0] });
              next();
            }
          }
        });
      }
    });
  },

  postNewForm: async (req, res, next) => {
    let { accountId, formType, newImplementationId } = req.body;
    let recordType;
    switch(formType) {
      case 'KlikNPay':
        recordType = process.env.KLIKNPAY_RECORD_TYPE;
        break;
      case 'eKlik':
        recordType = process.env.CATCH_RECORD_TYPE;
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
                    "Account_Name__c": accountId,
                    "New_Implementation_Lockbox__c": newImplementationId
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
  },

  updateFormData: async (req, res, next) => {
    let { accountId, sfFieldName, fieldValue, formType, newImplementationId } = req.body;
    let recordType;
    switch(formType) {
      case 'KlikNPay':
        recordType = process.env.KLIKNPAY_RECORD_TYPE;
        break;
      case 'eKlik':
        recordType = process.env.CATCH_RECORD_TYPE;
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
        //console.log(recordType);
        request({
          url: `${url}/services/data/v43.0/query?q=select+id+FROM+On_Boarding_Forms__c+WHERE+Account_Name__c+='${accountId}'+AND+RecordTypeId+='${recordType}'+AND+New_Implementation_Lockbox__c+='${newImplementationId}'`,
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sfToken,
          }
        }, (berror, bresponse, bbody) => {
          if(berror) {
            console.log('update form error', berror);
          } else {
            const result = JSON.parse(bbody);
            //console.log(result);
            const formId = result.records[0].Id;
            console.log({sfFieldName, fieldValue});
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
                        "Name": formType,
                        "RecordTypeId": recordType,
                        "Account_Name__c": accountId,
                        "New_Implementation_Lockbox__c": newImplementationId,
                        [sfFieldName]: fieldValue
                      }]   
              })
            }, (terror, tresponse, tbody) => {
              if(terror) {
                console.log('sf update form data error', terror);
              } else {
                const tresult = JSON.parse(tbody);
                // console.log({tresponse});
                console.log({success: 'updated form' });
                res.json({ tresult });
              }
            })
           }
         })
      }
    })    
  },

  uploadFile: async (req, res, next) => {
    let { newImplementationId, fileName, file } = req.body;
    await request(getSFTokenAPI, (error, response, body) => {
      if(error) {
        console.log('sf token error', error);
      } else {
        const result = JSON.parse(body);
        const url = result.instance_url;
        const sfToken = result.access_token;
        //console.log(recordType);
        request({
          url: 'https://cs77.salesforce.com/services/data/v43.0/composite/tree/Attachment',
              method: 'POST',
              headers: {
                      'Authorization': 'Bearer ' + sfToken,
                      'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                      "records": [{
                        "attributes": {"type": "Attachment", "referenceId": fileName},
                        "parentId": newImplementationId,
                        "Name": fileName,
                        "Body": file
                      }]   
              })
        }, (terror, tresponse, tbody) => {
          if(terror) {
            console.log('upload file error', werror);
          } else {
            const result = JSON.parse(tbody);
            // console.log({tresponse});
            console.log({success: 'uploaded file' });
            res.json({ result });
          }
        })
      }
    }) 
  }
}
