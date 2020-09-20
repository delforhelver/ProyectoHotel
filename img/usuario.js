'use strict'

var Usuario = require('../models/usuario');


var controller = {

    saveUsuario: function(req, res){
      var usuario = new Usuario();
      var params = req.body;
      usuario.email = params.email;
      usuario.pass = params.pass;
      usuario.firstname = params.firstname;
      usuario.lastname = params.lastname;
      usuario.city = params.city;
      usuario.state = params.state;
      usuario.phone = params.phone;

      Usuario.findOne({email: usuario.email}, (err, Usuario) => {
        if (!Usuario) {
          usuario.save((err, usuarioStored)=> {
          });
            res.locals.logged = true;
            console.log('Logeado: ', res.locals.logged);
          res.redirect('/');
        }
        else {
          res.redirect('/register');
        }
      });

  },

    loginUser: function(req, res, next){
    var usuario = new Usuario();
    var params = req.body;

      usuario.email =  params.email;
      usuario.pass =  params.pass;


    Usuario.findOne({email: usuario.email}, (err, Usuario) => {
      if (Usuario) {
          if (Usuario.pass==usuario.pass){
            res.locals.logged = true;
            console.log('Logeado: ', res.locals.logged);
              res.redirect('/');
        } else {

          res.locals.passIncorrecta = true;
              res.locals.usuarioNoEncontrado = false;
          console.log('Contra inc: ', res.locals.passIncorrecta);
          next();
        }
      } else {
          res.locals.usuarioNoEncontrado = true;
          res.locals.passIncorrecta = false;
          console.log('NO ENCONTRO: ',res.locals.usuarioNoEncontrado);
          next();
         ;
      }

   });


}



};

module.exports = controller;
