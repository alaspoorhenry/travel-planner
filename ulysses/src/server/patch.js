/* jshint esversion: 6 */

const itinerary = require("../model/itineraries.js");
const user = require("../model/users.js");
const server = require('./server.js');

module.exports = function(app){

  app.patch('/api/itineraries/:id/', server.isAuthenticated, server.checkId, function (req, res, next) {
    // if (['origin','destination'].indexOf(req.body.action) == -1) return res.status(400).end("unknown action" + req.body.action);
    itinerary.findOne({_id: req.params.id}, function(err, itinerary){
      if (err) return res.status(500).json({"error": err});
      if (!itinerary) return res.status(404).end("Itinerary id #" + req.params.id + " does not exists");
      itinerary[req.body.action] = req.body[req.body.action];
      itinerary.save(function(err, itinerary) {
        if (err) {
          res.status(500).json({"error": err});
        }
        res.status(200).json(itinerary);
      });
    });
  });

  app.patch('/api/user/:id/', server.isAuthenticated, server.checkId, function (req, res, next) {
  //app.patch('/api/user/:id/', function (req, res, next) {
    // if (['firstName','lastName','email'].indexOf(req.body.action) == -1) return res.status(400).end("unknown action" + req.body.action);
    user.findOne({_id: req.params.id}, function(err, usr){
      if (err) return res.status(500).json({"error": err});
      if (!usr) return res.status(404).end("User id #" + req.params.id + " does not exists");
      usr.firstName = req.body.firstName;
      usr.lastName = req.body.lastName;
      usr.email = req.body.email;
      usr.phoneNumber = req.body.phoneNumber;
      usr.info = req.body.info;
      if (usr["firstName"] && usr["lastName"]) {
        usr["fullName"] = usr["firstName"] + " " + usr["lastName"];
      } else if (usr["firstName"]){
        usr["fullName"] = usr["firstName"]
      } else {
        usr["fullName"] = usr["lastName"]
      }
      usr.save(function(err, usr) {
        if (err) {
          res.status(500).json({"error": err});
        }
        res.status(200).json(usr);
      });
    });
  });

  //@todo add patch for location object
};
