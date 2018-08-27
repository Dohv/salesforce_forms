const request = require('request');
const { getSFTokenAPI, getAccountIdSFQuery, getKNPFormDataSFQuery } = require('../helpers/routeHelpers');
module.exports = {
  getKlikNPayFormDataFromSF: async (req, res, next) => {
    const { email } = req.body;
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
              request(getKNPFormDataSFQuery(url, accountId, sfToken), (werror, wresponse, wbody) => {
                  if(werror) {
                    console.log('sf form data error', werror);
                  } else {
                  const wresult = JSON.parse(wbody);
                  if(wresult.totalSize === 0) {
                    res.json({ data: wresult.totalSize });
                    next();
                  } else {
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
    const { email } = req.body;
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
            //  res.json({ accountId });
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
                    "Name": "KlikNPay",
                    "RecordTypeId": process.env.KLIKNPAY_RECORD_TYPE,
                    "Account_Name__c": accountId
                  }]
                })     
            }, (werror, wresponse, wbody) => {
              if(werror) {
                console.log('sf form data error', werror);
              } else {
              const wresult = JSON.parse(wbody);
              console.log(wresult);
             }
            })
           }
         })
      }
    })    
  },

  updateFormData: async (req, res, next) => {

  }
}

