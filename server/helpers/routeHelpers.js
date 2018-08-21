const Joi = require('joi');
const request = require('request');

module.exports = {
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
            url: `${url}/services/data/v43.0/query?q=select+id,account.id+FROM+Contact+WHERE+email+='${email}'`,
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
                  return res.json({message: 'There is no email for that account.'});
                } else {
                   next();
                }
              }
          });
        }
      });
    }
}

    



