'use strict';

var mongoose = require('mongoose');

var Vinyl;

var vinylSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  artist: { type: String, required: true},
  album: { type: String, required: true},
  condition: { type: Number, min: 1, max: 5, required: true},
  year: { type: Number, min: 1857},
  genre: { type: String }
  // automatically gets _id, which is a unique mongo id
});

Vinyl = mongoose.model('Vinyl', vinylSchema);

module.exports = Vinyl;
