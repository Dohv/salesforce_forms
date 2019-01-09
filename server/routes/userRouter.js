const express = require('express');
const userRouter = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');

const { validateBody, schemas, validateEmailInSF, getLockboxesFromAccount} = require('../helpers/routeHelpers');
const controller = require('../controllers/userController');

userRouter.post('/signup', 
                validateBody(schemas.authSchema), 
                controller.signUp
              );
userRouter.post('/signin', 
                validateBody(schemas.authSchema), 
                passport.authenticate('local', {session: false}), 
                validateEmailInSF,
                getLockboxesFromAccount,
                controller.signIn
                //controller.awsLogin
              );
// userRouter.post('/changePassword',
//                 controller.changePassword
//                 );
userRouter.post('/logout', 
                controller.logout
              );
userRouter.post('/forgot', 
                controller.forgot
              );

module.exports = userRouter;