var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    user: String,
    name: String,
    geometry: {
      lat: Number,
      lng: Number
    },
    address: String,
    postalCode: String,
    photoUrl: String,
    rating: Number,
    types: [],
    totalUserRatings: Number,
    updated: { type: Date, default: Date.now}
  },
  // remove "__v" field
  { versionKey: false });
//export our module to use in server.js
module.exports = mongoose.model('location', locationSchema);
