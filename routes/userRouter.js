const express = require('express');
const userRouter = require('express-promise-router')();
const controller = require('../controllers/userController');

userRouter.post('/signup', controller.signUp);
userRouter.post('/signin', controller.signIn);
userRouter.get('/secret', controller.secret);

module.exports = userRouter;