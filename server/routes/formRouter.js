const express = require('express');
const formRouter = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
const { getFormDataFromSF, postNewForm, updateFormData, getClients, uploadFile } = require('../controllers/formController');

formRouter.post('/form',
                passport.authenticate('jwt', {session: false}),
                getFormDataFromSF
              );
formRouter.post('/clients',
              passport.authenticate('jwt', {session: false}), 
              getClients
            );
formRouter.post('/new',
                passport.authenticate('jwt', {session: false}),
                postNewForm
              );
formRouter.post('/update',
              passport.authenticate('jwt', {session: false}),
              updateFormData
            );
formRouter.post('/upload',
            passport.authenticate('jwt', {session: false}),
            uploadFile
          );






module.exports = formRouter;