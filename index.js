'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Hotel', { useNewUrlParser: true, useUnifiedTopology: true})
                .then(() =>{
                  console.log("Funciona la bdd");
                  //sv create
                  app.listen(port, () => {

                  console.log("Server corriendo: 3700");
                  });


                })
                .catch(err => console.log(err));
