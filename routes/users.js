'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var ref = new Firebase('https://this-is-vinyl-tap.firebaseio.com/');

router.get('/register', function(req, res, next) {
  var token = req.cookies.userjwt;
  if(token) return res.redirect("/dashboard");
  res.render('register');
});

router.get('/login', function(req, res, next) {
  var token = req.cookies.userjwt;
  if(token) return res.redirect("/dashboard");
  res.render('login');
});

router.get('/changePassword', User.isLoggedIn, function(req, res, next) {
  res.render('changePassword');
});

router.put('/password', User.isLoggedIn, function(req, res, next) {
  User.findById(req.user._id, function(err, user){
    ref.changePassword({
      email: user.email,
      oldPassword: req.body.oldPass,
      newPassword: req.body.newPass
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
          res.status(400).send("The specified user account password is incorrect.");
          break;
          case "INVALID_USER":
          res.status(400).send("The specified user account does not exist.");
          break;
          default:
          res.status(400).send("Error changing password:", error);
        }
      } else {
        res.send("User password changed successfully!");
      }
    });
  });
});

router.post('/register', function(req, res, next) {
  User.register(req.body, function(err, savedUser) {
    res.status(err ? 400 : 200).send(err || savedUser);
  });
});

router.get("/forgot", function(req, res, next) {
  var token = req.cookies.userjwt;
  if(token) return res.redirect("/dashboard");
  res.render("forgotLogin");
})

router.post("/forgot", function(req, res, next) {
  User.forgot(req.body, function(err){
    if(err) return res.status(400).send(err.code);
    res.send("Password reset e-mail sent.");
  });
})

router.post('/login', function(req, res, next) {

  // req.body --> {email:  , password:  }

  User.login(req.body, function(err, token) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.cookie('userjwt', token).send("User Logged In");
    }
  });
});

router.post('/logout', function(req, res, next) {
  res.clearCookie('userjwt').send();
});

router.get('/profile', User.isLoggedIn, function(req, res) {
  User.findById(req.token._id, function(err, user) {
    res.send(user);
  });
});

module.exports = router;
