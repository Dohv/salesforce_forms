const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../configuration');

const controller = {};

const signToken = user => {
  return jwt.sign({
    iss: 'Codeworkr',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead 
  }, JWT_SECRET);
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
  res.status(200).json({ token }) 
}

controller.signIn = async (req, res, next) => {
  console.log('user signin() has been called');
}

controller.secret = async (req, res, next) => {
  console.log('user secret() has been called');
}

module.exports = controller;