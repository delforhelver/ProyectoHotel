'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = Schema({
email: String,
pass: String,
firstname: String,
lastname: String,
city: String,
state: String,
phone: String,


});


userSchema.methods.encryptPassword = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

};

userSchema.methods.comparePassword = function (pass) {
  return  bcrypt.compareSync(pass, this.pass);

};

module.exports = mongoose.model('user',userSchema);
