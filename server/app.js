const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ApiAuth", { useNewUrlParser: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected to db!");
});

require('dotenv').config()

const app = express();

const formRouter = require('./routes/formRouter');
const userRouter = require('./routes/userRouter');



const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`Linsten on port ${PORT}`);
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.options('*', cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  //to let react-router handle routing in prod.
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}

app.use('/api', formRouter);
app.use('/users', userRouter);



app.get('*', function (req, res) {
  res.status(404).send({message: 'Oops! Something went wrong!'})
});


var jsforce = require('jsforce');
var conn = new jsforce.Connection();

