const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config');
const { ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel');

// Json Web Token Strategy
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    //console.log('about to find User by id', {user: payload.sub});
    // Find the user specified in token
    const user = await User.find({id: payload.sub});
    
    // if user doesn't exsist, ...
    if(!user) {
      console.log('no user');
      return done(null, false);
    }

    //console.log('found user', user);

    // Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// Local Strategy

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    //Find the user given the email
    const user = await User.findOne({ email });
    // If not, handle it
    if(!user) {
      return done(null, false, {message: 'Invaild Email'});
    }
    // Check if password is correct
    const isMatch = await user.isValidPassword(password);
    // If not, handle it
    if(!isMatch) {
      return done(null, false, {message: 'Invalid Password'});
    }
    // Otherwise return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// AWS Cognito Strategy



