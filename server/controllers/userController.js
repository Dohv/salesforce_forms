const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const request = require('request');
const crypto = require('crypto');
var async = require("async");
const nodemailer = require('nodemailer');


const controller = {};

const signToken = user => {
  return jwt.sign({
    iss: 'CAForms',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead 
  }, process.env.JWT_SECRET);
}

controller.signUp = async (req, res, next) => {
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
  const sfAccountId = res.locals.accountId;
  const sfAccountType = res.locals.accountType;
  const sfAccountProducts = res.locals.accountProducts;
  res.status(200).json({ token, email, id, message, sfAccountId, sfAccountType, sfAccountProducts });
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

controller.logout = (req, res) => {
  req.logout();

  res.json({message: 'logged out'});
}

module.exports = controller;