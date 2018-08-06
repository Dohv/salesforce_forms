const express = require('express');
const formRouter = express.Router();
const controller = require('../controllers/formController');

// formRoutes.get('/form1/:id', controller.edit);
formRouter.get('/form1', controller.index);


// formRoutes.put('form1/:id', controller.update);





module.exports = formRouter;