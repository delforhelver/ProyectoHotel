'use strict'

var express = require('express');

var resController = require('../controllers/reservations');

var router = express.Router();

const passport = require('passport');


router.get('/login', (req, res, next) => {
    res.render('login', {layout: '' });
});

router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));


router.get('/register', (req, res, next) => {
    res.render('register', {layout: ''});
});

router.post('/register', passport.authenticate('local-register',  {
successRedirect: '/',
failureRedirect: '/register',
passReqToCallback: true
}));


router.get("/logout", function(req, res) {
 req.logout();
 res.redirect("/");
});

router.post('/saveReserve', resController.saveReserve);





router.get('/', (req, res, next) =>{
    res.render('index');
});

router.get('/contact', function(req, res) {
    res.render('contact');
});

router.get('/aboutus', function(req, res) {
    res.render('aboutus');
});

router.get('/rooms', function(req, res) {
    res.render('rooms');
});

router.get('/recreation', function(req, res) {
    res.render('recreation');
});

router.get('/spa', function(req, res) {
    res.render('spa');
});

router.get('/restaurant', function(req, res) {
    res.render('restaurant');
});

router.get('/profile', function(req, res) {
    res.render('profile');
});

router.get('/reservations', function(req, res) {
    res.render('reservations');
});


module.exports = router;
