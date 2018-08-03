const express = require('express');
const userRouter = require('express-promise-router')();

const {validateBody, schemas } = require('../helpers/routeHelpers');
const controller = require('../controllers/userController');

userRouter.post('/signup', validateBody(schemas.authSchema), controller.signUp);
userRouter.post('/signin', controller.signIn);
userRouter.get('/secret', controller.secret);

module.exports = userRouter;