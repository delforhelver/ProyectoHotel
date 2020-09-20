'use srict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
require('./passport/local-auth');

//vistas
app.engine('.hbs', hbs({
defaultLayout: 'layout',
partialsDir: __dirname + '/views/partials/',
extname: '.hbs'
}));
app.set('view engine', '.hbs');



//arch rutas

var index_routes = require('./routes/index');


//middlewaras
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {

  app.locals.user = req.user;
  // console.log(app.locals)
  next();
});

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

// CORS

// rutas
app.use('/', require('./routes/index'));

//static files
app.use(express.static('img'));
app.use(express.static('css'));
app.use('/', index_routes);


//export


module.exports = app;
