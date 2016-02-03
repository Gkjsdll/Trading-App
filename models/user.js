'use strict';

var mongoose = require('mongoose');
var Firebase = require('firebase');
var jwt = require('jwt-simple');
var moment = require('moment');

var JWT_SECRET = process.env.JWT_SECRET;

var ref = new Firebase('https://sillylogintest.firebaseio.com/')

var User;

var userSchema = mongoose.Schema({
  firebaseId: { type: String, required: true },
  name: {
    first: { type: String },
    last: { type: String }
  },
  email: { type: String },
  phone: { type: String }
  // automatically gets _id, which is a unique mongo id
});

// statics = model method   User.register()
userSchema.statics.register = function (userObj, cb) {
  if(!userObj.email || !userObj.password) {
    return cb('Missing required field (email, password)');
  }
  // userObj === {email: 'something', password: 'something else'}
  ref.createUser(userObj, function(err, userData) {  // create user on firebase
    if(err) return cb(err);  // error could be that email was in use.
                             // invoke callback with error and stop
    var user = new User();
    user.firebaseId = userData.uid;
    user.email = userObj.email;
    user.save(cb);
  });
};

userSchema.statics.login = function(userObj, cb) {
  if(!userObj.email || !userObj.password) {
    return cb('Missing required field (email, password)');
  }
  ref.authWithPassword(userObj, function(err, authData) {  // authenticate email/pw with firebase
    if(err) return cb(err);
    User.findOne({firebaseId: authData.uid}, function(err, user) {  // find matching user from db
      if(err || !user) return cb(err || 'User not found in db.');
      var token = user.generateToken();
      cb(null, token); // no errors, callback with token.
    });
  });
};


userSchema.statics.isLoggedIn = function(req, res, next) {
/*
1.  Open cookie to find userjwt token
2.  Try to decode it to get the payload
3.  Ensure that the token is valid and fresh (not expired)
4.  If token is good, attach user data to the request object, and call next().
    (this will invoke the next piece of middleware)
5.  If the token cannot be decoded, or it has expired, respond immediately with a code 401 (unauthorized)
*/
  var token = req.cookies.userjwt;
  if(!token) return authFail('no token');

  // jwt.decode may fail, so we can wrap it in a try-catch block.
  try {
    var payload = jwt.decode(token, JWT_SECRET);  // risky code
  } catch (err) { // if risky code fails, error will be caught here
    return authFail('decode fail');
  }

  // checking token freshness.  token is only valid within 1 hour of issue time
  if(moment().isAfter( moment(payload.iat, 'X').add(1, 'day') )) {
    return authFail('expiration fail');
  };

  req.token = payload;

  next();

  function authFail(err) {
    res.status(401).send({error: `Authentication failed: ${err}`})
  }

};

// methods = instance method  oneuser.generateToken()
userSchema.methods.generateToken = function() {
  var payload = {
    firebaseId: this.firebaseId,
    _id: this._id,  // _id always references the mongo object id of the document
    iat: moment().unix()    // issued at time  - unix timestamp
  };
  var token = jwt.encode(payload, JWT_SECRET)
  return token;
}

User = mongoose.model('User', userSchema);

module.exports = User;
