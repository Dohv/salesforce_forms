const express = require('express');
const lockboxRouter = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
const { getLockboxDataFromSF, updateLockboxtData } = require('../controllers/lockboxController');

lockboxRouter.post('/getData',
                passport.authenticate('jwt', {session: false}),
                getLockboxDataFromSF
              );
lockboxRouter.post('/update',
              passport.authenticate('jwt', {session: false}),
              updateLockboxtData
            );

module.exports = lockboxRouter;
