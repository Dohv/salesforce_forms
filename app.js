const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const formRoutes = require('./routes/formRoutes');


const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Linsten on port ${PORT}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
  console.log('right before res.render');
  res.render("root", {
    message: 'Welcome to Checkalt Forms',
    documentTitle: 'CA Forms',
    subTitle: 'Onboarding forms for lockbox services',
    showMore: true
  });
});

app.use('/forms', formRoutes);



app.get('*', function (req, res) {
  res.status(404).send({message: 'Oops! Something went wrong!'})
});