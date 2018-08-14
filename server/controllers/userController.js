const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const request = require('request');


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
  res.status(200).json({ token, email, id });
  // next();
}

controller.secret = async (req, res, next) => {
  console.log('got here!! and user secret() has been called');
  await fetch('https://test.salesforce.com/services/oauth2/token', {
        method: 'POST',
        form: {
          grant_type:process.env.GRANT_TYPE,
          client_id:process.env.CLIENT_ID,
          client_secret:process.env.CLIENT_SECRET,
          username:process.env.USERNAME,
          password:process.env.PASSWORD
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
      
        
}

controller.logout = (req, res) => {
  req.logout();
  res.json({message: 'logged out'});
}

module.exports = controller;