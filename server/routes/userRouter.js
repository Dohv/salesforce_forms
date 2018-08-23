const express = require('express');
const userRouter = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');

const { validateBody, schemas, validateEmailInSF, getFormData } = require('../helpers/routeHelpers');
const controller = require('../controllers/userController');

userRouter.post('/signup', 
                validateBody(schemas.authSchema), 
                controller.signUp
              );
userRouter.post('/signin', 
                validateBody(schemas.authSchema), 
                passport.authenticate('local', {session: false}), 
                validateEmailInSF,
                controller.signIn
              );
// userRouter.post('/form',
//                 passport.authenticate('jwt', {session: false}), 
//                 getFormData,
//                 controller.secret
//               );
userRouter.post('/logout', 
                controller.logout
              );
userRouter.post('/forgot', 
                controller.forgot
              );

module.exports = userRouter;