var express = require('express');
var router = express.Router();
var jwt = require("jwt-simple")
var JWT_SECRET = process.env.JWT_SECRET; //this need be set manually in the environment

var User = require("../models/user");
var Vinyl = require("../models/vinyl");

router.get("/dashboard", User.isLoggedIn, function(req, res, next) {
  var userToken = jwt.decode(req.cookies.userjwt, JWT_SECRET);
  var userId = userToken._id;
  User.findById(userToken._id , function(err, foundUser){
    if(err) return res.status(400).send(err);
    console.log(foundUser);
    Vinyl.find({owner: userId}, function(err, vinyls) {
      if(err) return res.status(400).send(err);
      res.render("dashboard", {user: foundUser.name, owned: vinyls});
    })
  })
})

router.get('/catalog', User.isLoggedIn, function(req, res, next) {
  Vinyl.find({owner: {$ne: req.user_id} }, function(err, vinyls) {
    if(err) return res.status(400).send(err);
    res.render('catalog', {catalog: vinyls});
  });
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is Vinyl Tap' });
});


module.exports = router;
