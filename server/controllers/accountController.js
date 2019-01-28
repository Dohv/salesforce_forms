const request = require('request');
const { getSFTokenAPI, getAccountDataSFQuery } = require('../helpers/routeHelpers');

module.exports = {
    getAccountDataFromSF: async (req, res, next) => {
        console.log('in getAccountDataFromSF');
        let { accountId } = req.body;

        await request(getSFTokenAPI, (error, response, body) => {
          if(error) {
            console.log('sf token error', error);
          } else {
            const result = JSON.parse(body);
            const url = result.instance_url;
            const sfToken = result.access_token;
            request(getAccountDataSFQuery(url, accountId, sfToken), (terror, tresponse, tbody) => {
              if(terror) {
                console.log('sf  getAccount data error', terror);
              } else {
                const result = JSON.parse(tbody);
                //console.log(result.records[0])
                res.json({ data: result.records[0] });
              }
            })
          }
        })
    },

    updateAccountData: async (req, res, next) => {
        let { accountId, sfFieldName, fieldValue } = req.body;
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
                            "attributes": {"type": "Account"},
                            "id": accountId,
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