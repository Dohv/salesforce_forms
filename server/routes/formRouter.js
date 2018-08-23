const express = require('express');
const formRouter = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
const { getKlikNPayFormDataFromSF, postNewForm, updateFormData } = require('../controllers/formController');

formRouter.post('/form',
                passport.authenticate('jwt', {session: false}), 
                getKlikNPayFormDataFromSF
              );
formRouter.post('/new',
                passport.authenticate('jwt', {session: false}),
                postNewForm
              );
formRouter.post('/update',
              passport.authenticate('jwt', {session: false}),
              updateFormData
            );






module.exports = formRouter;