const express = require('express');
const app = express();
const Reserve = require('../models/reservation');

var resController = {

saveReserve: function (req, res){
var newReserve = new Reserve();
newReserve.fecha_entrada = req.body.fechaEntrada,
newReserve.fecha_salida = req.body.fechaSalida,
newReserve.personas = req.body.personas,
newReserve.tipoHab = req.body.tipoHab,
newReserve.save();
res.redirect('/reservations');


}

}


module.exports = resController;
