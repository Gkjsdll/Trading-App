'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  User.register(req.body, function(err, savedUser) {
    res.status(err ? 400 : 200).send(err || savedUser);
  });
});

router.post('/login', function(req, res, next) {

  // req.body --> {email:  , password:  }

  User.login(req.body, function(err, token) {
    if(err) {
      res.status(400).send(err);
    } else {
      console.log('token:', token);
      res.cookie('userjwt', token).send();
    }
  });
});

router.post('/logout', function(req, res, next) {
  res.cookie('userjwt', null).send();
});

router.get('/profile', User.isLoggedIn, function(req, res) {
  User.findById(req.token._id, function(err, user) {
    res.send(user);
  });
});

module.exports = router;
