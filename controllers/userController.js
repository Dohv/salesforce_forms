const User = require('../models/userModel');

const controller = {};

controller.signUp = async (req, res, next) => {
  const { email, password } = req.value.body;
  
  const foundUser = await User.findOne({ email });
  if(foundUser) {
    return res.status(403).json({ message: 'ERROR! email already in use.'})
  }
  
  const newUser = new User({ email, password });
  await newUser.save();

  //use flash message evetualy 
  res.json({ message: 'user created succesfully'});
}

controller.signIn = async (req, res, next) => {
  console.log('user signin() has been called');
}

controller.secret = async (req, res, next) => {
  console.log('user secret() has been called');
}

module.exports = controller;