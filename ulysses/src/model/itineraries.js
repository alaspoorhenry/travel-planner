var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itinerarySchema = new Schema({
    user: String,
    username: String,
    name: String,
    origin: String,
    destination: String,
    date: Date,
    locations: [],
    updated: { type: Date, default: Date.now}
  },
  // remove "__v" field
  { versionKey: false });
//export our module to use in server.js
module.exports = mongoose.model('itinerary', itinerarySchema);
