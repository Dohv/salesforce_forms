const express = require('express');
const userRouter = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport')

const {validateBody, schemas } = require('../helpers/routeHelpers');
const controller = require('../controllers/userController');

userRouter.post('/signup', validateBody(schemas.authSchema), controller.signUp);
userRouter.post('/signin', validateBody(schemas.authSchema), 
                passport.authenticate('local', {session: false}), 
                controller.signIn
              );
userRouter.get('/secret', passport.authenticate('jwt', {session: false}), controller.secret);

module.exports = userRouter;