const express = require('express');
const formRoutes = express.Router();

const controller = require('../controllers/formController');;

// formRoutes.get('/form1/:id', controller.edit);
formRoutes.get('/form1', (req, res) => {
  res.render('../views/form_new');
})



formRoutes.post('/', controller.create);

// formRoutes.put('form1/:id', controller.update);





module.exports = formRoutes;