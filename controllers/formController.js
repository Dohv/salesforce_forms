const Form = require('../models/formModel');

const controller = {};

controller.index = (req, res) => {
  console.log('inside index function');
  Form.findAll()
    .then(formData => {
      res.json(formData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = controller;

