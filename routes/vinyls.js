'use strict';

var express = require('express');
var router = express.Router();

var Vinyl = require('../models/vinyl');
var User = require('../models/user');

router.get("/", User.isLoggedIn, function(req, res, next) {
  Vinyl.find({}, function(err, vinyls) {
    if(err){
      return res.status(400).send(err);
     }
    res.send(vinyls);
  });
});

router.get("/add", User.isLoggedIn, function(req, res, next) {
  res.render("addVinyl");
});

router.get('/:id', User.isLoggedIn, function(req, res, next) {
  Vinyl.findById(req.params.id, function(err, vinyl) {
    if(err){
      return res.status(400).send(err);
     }
    res.send(vinyl);
  });
});

router.post("/", User.isLoggedIn, function(req, res, next) {
  var vinyl = new Vinyl();
  
  vinyl.owner = req.user._id;
  vinyl.artist = req.body.artist;
  vinyl.album = req.body.album;
  vinyl.condition = req.body.condition;
  vinyl.year = req.body.year;
  vinyl.genre = req.body.genre;

  vinyl.save(function(err, savedVinyl) {
    if(err) return res.send(err);
    res.send(savedVinyl);
  });
});

module.exports = router;
