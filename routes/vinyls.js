'use strict';

var express = require('express');
var router = express.Router();

var Vinyl = require('../models/vinyl');
var User = require('../models/user');

router.get("/", User.isLoggeIn, function(req, res) {
  Vinyl.find({}, function(err, vinyls) {
    if(err){
      return res.status(400).send(err);
     }
    res.send(vinyls);
  });
});

router.get('/:id', User.isLoggedIn, function(req, res) {
  Vinyl.findById(req.params.id, function(err, vinyl) {
    if(err){
      return res.status(400).send(err);
     }
    res.send(vinyl);
  });
});

module.exports = router;
