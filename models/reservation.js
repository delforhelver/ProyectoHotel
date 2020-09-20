var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var reserveSchema = Schema({
fecha_entrada: Date,
fecha_salida: Date,
importe: Number,
email_cliente: String,
nombre_cliente: String,
num_cliente: Number,
tipo_de_pago: String,
personas:Number,
tipoHab: String
});

module.exports = mongoose.model('reserve',reserveSchema);
