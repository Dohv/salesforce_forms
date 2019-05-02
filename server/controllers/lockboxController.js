const request = require('request');
const { getSFTokenAPI, getLockboxDataSFQuery } = require('../helpers/routeHelpers');

module.exports = {
    getLockboxDataFromSF: async (req, res, next) => {
        console.log('in getLockboxDataFromSF');
        let { newImplementationId } = req.body;

        await request(getSFTokenAPI, (error, response, body) => {
          if(error) {
            console.log('sf token error', error);
          } else {
            const result = JSON.parse(body);
            const url = result.instance_url;
            const sfToken = result.access_token;
            request(getLockboxDataSFQuery(url, newImplementationId, sfToken), (terror, tresponse, tbody) => {
              if(terror) {
                console.log('sf  get lockbox data error', terror);
              } else {
                const result = JSON.parse(tbody);
                //console.log(result.records[0])
                res.json({ data: result.records[0] });
              }
            })
          }
        })
    },

    updateLockboxtData: async (req, res, next) => {
        let { newImplementationId, sfFieldName, fieldValue } = req.body;
        console.log({sfFieldName, fieldValue});
        await request(getSFTokenAPI, (error, response, body) => {
          if(error) {
            console.log('sf token error', error);
          } else {
            const result = JSON.parse(body);
            const url = result.instance_url;
            const sfToken = result.access_token;
            request({
                  url: 'https://cs77.salesforce.com/services/data/v43.0/composite/sobjects',
                  method: 'PATCH',
                  headers: {
                          'Authorization': 'Bearer ' + sfToken,
                          'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                          "records": [{
                            "attributes": {"type": "New_Implementation__c"},
                            "id": newImplementationId,
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
}