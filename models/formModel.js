const db = require('../db/config');

const Form = {};

Form.findAll = () => {
  return db.query('SELECT * FROM form1 ORDER BY id ASC');
};

module.exports = Form;