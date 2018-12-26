const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const request = require('request');
const crypto = require('crypto');
var async = require("async");
const nodemailer = require('nodemailer');
global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const jwkToPem = require('jwk-to-pem');

const poolData = {    
  UserPoolId : process.env.AWS_POOL_ID, // Your user pool id here    
  ClientId : process.env.AWS_CLIENT_ID // Your client id here
  }; 
const pool_region = 'us-east-1';


const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const controller = {};

const signToken = user => {
  return jwt.sign({
    iss: 'CAForms',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead 
  }, process.env.JWT_SECRET);
}

// controller.registerUser = (req, res, next) => {
//   const { username, password } = req.body;
//   var attributeList = [];
  
//   attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:username}));
//   attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"password",Value:password}));

//   userPool.signUp(username, password, attributeList, null, function(err, result){
//       if (err) {
//         console.log(new Error().stack);
//         console.log(err.message || JSON.stringify(err));
//           return;
//       }
//       cognitoUser = result.user;
//       console.log('user name is ' + cognitoUser.getUsername());
//   });

//   res.status(200).json({message: 'success'});
// }

// controller.awsLogin = (req, res, next) => {
  
//   const { username, password, newPassword } = req.body;
//   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//     Username: username,
//     Password: password,
//   });

//   console.log({authenticationDetails});

//   var userData = {
//       Username: username,
//       Pool : userPool
//   };

//   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//   cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
//   cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: function (result) {
//           console.log('access token + ' + result.getAccessToken().getJwtToken());
//           console.log('id token + ' + result.getIdToken().getJwtToken());
//           console.log('refresh token + ' + result.getRefreshToken().getToken());
//           res.json({result})
//       },
//       onFailure: function(err) {
//         console.log(new Error().stack);
//         console.log(err.message || JSON.stringify(err));
//       },
//       newPasswordRequired: (userAttributes, requiredAttributes) => {

//         // the api doesn't accept this field back
//         delete userAttributes.email_verified;

//         cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
//     },

//   });

//   // res.locals.contactName = vresult.records[0].Name
//   // res.locals.accountName = vresult.records[0].Account.Name; 
//   // res.locals.accountId = vresult.records[0].Account.Id;
//   // res.locals.accountType = vresult.records[0].Account.Type;
//   // res.locals.accountProducts = vresult.records[0].Account.Products__c.split(';');
// }

// controller.changePassword = async (req, res, next) => {
//   const { username, password, newpassword } = req.body;
//   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//     Username: username,
//     Password: password,
//   });

//   var userData = {
//       Username: username,
//       Pool: userPool
//   };
//   var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//   cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: function (result) {
//           cognitoUser.changePassword(password, newpassword, (err, result) => {
//               if (err) {
//                   console.log(err);
//               } else {
//                   console.log("Successfully changed password of the user.");
//                   console.log(result);
//               }
//           });
//       },
//       onFailure: function (err) {
//         console.log(new Error().stack);
//         console.log(err.message || JSON.stringify(err));
//       },
//   });
// }


controller.signUp = async (req, res, next) => {
  console.log('in user controller');

  //remember to swith the JOI validations back to email and password and change the routes back
  const { email, password } = req.value.body;
  
  const foundUser = await User.findOne({ email });
  if(foundUser) {
    return res.status(403).json({ message: 'ERROR! email already in use.'})
  }
  

  //Create a user
  const newUser = new User({ email, password });
  await newUser.save();

  const token = signToken(newUser);

  // Respond with token 
  res.status(200).json({ token }); 
}

controller.signIn = async (req, res, next) => {
  const {email, id} = req.user;
  const token = signToken(req.user); 
  const message = 'Welcome!';
  const sfContactName = res.locals.contactName;
  const sfAccountName = res.locals.accountName;
  const sfAccountId = res.locals.accountId;
  const sfAccountType = res.locals.accountType;
  const sfAccountProducts = res.locals.accountProducts;

  var query = { _id: id };
  var update = { last_login_date: Date.now() };
  var options = { new: true };

  await User.findByIdAndUpdate(query, {$set: update}, options, (err, doc) => {
    if (err) {
      console.log(err, doc)
    }
    //console.log({id, doc});
  })

  res.status(200).json({ token, email, id, message, sfAccountName, sfAccountId, sfAccountType, sfAccountProducts, sfContactName });
}

controller.secret = async (req, res, next) => {
  console.log('got here!! and user secret() has been called');      
}

controller.forgot = (req, res, next) => {
  console.log('got here!! and forgot() has been called'); 
  async.waterfall([
    done => {
      crypto.randomBytes(20, (err, buf) => {
        const token = buf.toString('hex');
        console.log({buf, token});
        done(err, token);
      });
    },
    (token, done) => {
      const { email } = req.value.body;
  
      User.findOne({ email }, (err, foundUser) => {
        if(!foundUser) {
          return res.status(403).json({message: 'Invailid Email'});
        }

        foundUser.resetPasswordToken = token;
        foundUser.resetPasswordExpires = Date.now() + 900000; // 15 minutes
        foundUser.save((err) => {
          done(err, token, foundUser);
        });
      });
    },
    (token, foundUser, done) => {
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAILACCOUNT,
          password: process.env.GMAILPW
        }
      });
      const mailOptions = {
        to: foundUser.email,
        from: process.env.GMAILACCOUNT,
        subject: 'Password Reset',
        text: 'You are receiving this email because you (or someone else) have requested the reset of the password to your account. \n\n' +
        'Please click on the following link or paste it into your browser to complete the process. \n\n' + 'http://' + req.headers.host + '/reset/' + token + '\n\n' + 'If you did not make this request, ignore this email and your password will remain unchanged. \n\n' + 'Thanks! :-)'
      };
      smtpTransport.sendMail(mailOptions, (err) => {
        console.log('mail sent');
        res.json({message: `An email has been sent to ${foundUser.email}.`});
        done(err, 'done');
      });
    } 
  ],
  err => {
    if(err) return res.status(400).json({message: err})
  }
)
  res.json({ message: 'Forgot Password'})     
}

controller.logout = async (req, res) => {
  const id = req.body.id;
  var query = { _id: id };
  var update = { last_logout_date: Date.now() };
  var options = { new: true };
  await User.findByIdAndUpdate(query, {$set: update}, options, (err, doc) => {
    if (err) {
        console.log(err, doc)
    }
  })
  req.logout();

  res.json({message: 'logged out'});
}

module.exports = controller;