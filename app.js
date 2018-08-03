const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const formRouter = require('./routes/formRouter');
const userRouter = require('./routes/userRouter');



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
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403)  
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'dov',
    email: 'dov@example.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s'}, (err, token) => {
    res.json({
      token
    })
  });
});



function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.use('/api', formRouter);
app.use('/users', userRouter);



app.get('*', function (req, res) {
  res.status(404).send({message: 'Oops! Something went wrong!'})
});