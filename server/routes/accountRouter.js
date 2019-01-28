const express = require('express');
const accountRouter = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
const { getAccountDataFromSF, updateAccountData } = require('../controllers/accountController');

accountRouter.post('/getData',
                passport.authenticate('jwt', {session: false}),
                getAccountDataFromSF
              );
accountRouter.post('/update',
              passport.authenticate('jwt', {session: false}),
              updateAccountData
            );




module.exports = accountRouter;