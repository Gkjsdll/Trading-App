var express = require('express');
var router = express.Router();
var jwt = require("jwt-simple")
var JWT_SECRET = process.env.JWT_SECRET; //this need be set manually in the environment

var User = require("../models/user");

router.get("/dashboard", function(req, res, next) {
  var userToken = jwt.decode(req.cookies.userjwt, JWT_SECRET);
  var userId = userToken._id;
  User.findById(userToken._id , function(err, foundUser){
    if(err) return res.status(400).send();
    console.log(foundUser);
    res.render("dashboard", {user: foundUser.name});
  })
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is Vinyl Tap' });
});


module.exports = router;
