const Form = require('../models/formModel');

const controller = {};

controller.create = (req, res) => {
  console.log('inside create function');
  Form.create({
    input1: req.body.input1,
  })
  .then(form => {
    res.redirect('/');
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

module.exports = controller;

