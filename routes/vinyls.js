'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Vinyl = require('../models/vinyl');

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

router.delete("/", User.isLoggedIn, function(req, res, next) {
  Vinyl.findByIdAndRemove(req.body.vinyl_id, function(err, removedVinyl) { //if callback not specified, a query object is returned and the item is not deleted
    if(err) return res.status(400).send();
    res.send("Vinyl Removed");
  });
});

module.exports = router;
