const db = require('../db/config');

const Form = {};

Form.create = form => {
  console.log('inside of form model');
  return db.one(
    `
    INSERT INTO form1
    (input1)
    VALUES($1) RETURNING *
    `,
    [form.input1]
  );
};

module.exports = Form;