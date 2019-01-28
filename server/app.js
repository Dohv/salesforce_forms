const express = require('express')
    , morgan = require('morgan')
    , jwt = require('jsonwebtoken')
    , cors = require('cors')
    , path = require('path')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , mongoose = require('mongoose')
    // , BearerStrategy = require('passport-azure-ad').BearerStrategy
    // , authenticatedUserTokens = []
    , config = require('./config')
    , passport = require('passport')
    , serverPort = process.env.PORT || config.serverPort
;

 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ApiAuth", { useNewUrlParser: true});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected to db!");
});

require('dotenv').config()

const app = express();
app.use(passport.initialize());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// const authenticationStrategy = new BearerStrategy(config.credentials, (req, token, done) => {
//   let currentUser = null;
//   console.log('verifying the user');

//   let userToken = authenticatedUserTokens.find((user) => {
//     console.log({email: user.email});
//     req.user = user.email;
//     console.log({ token, user: req.user });
//       currentUser = user;
//       user.sub === token.sub;
//   });

//   if(!userToken) {
//       authenticatedUserTokens.push(token);
//   }

//   return done(null, currentUser, token);
// });



// passport.use(authenticationStrategy);




const accountRouter = require('./routes/accountRouter');
const formRouter = require('./routes/formRouter');
const userRouter = require('./routes/userRouter');



//const PORT = process.env.PORT || 3001;
app.listen(serverPort, function() {
  console.log(`Linsten on port ${serverPort}`);
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));
app.use(methodOverride('_method'));

app.options('*', cors());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  //to let react-router handle routing in prod.
  app.get('*', (req, res) => {
      // console.log("about to resolve path");
      const index = path.resolve(__dirname, '../client/build', 'index.html');
      // console.log(index);
      // console.log('resolved path');
      res.sendFile(index);
  });
}


// app.get('/', (req, res, next) => {
//   res.status(200).send('Try: curl -isS -X GET http://127.0.0.1:3001/api');
//   next();
// });

// app.get('/test', passport.authenticate('oauth-bearer', { session: false }), (req, res, next) => {
//   res.json({ message: 'response from API endpoint' });
//   next();
// });


app.use('/account', accountRouter);
app.use('/api', formRouter);
app.use('/users', userRouter);



app.get('*', function (req, res) {
  res.status(404).send({message: 'Oops! Something went wrong!'})
});


