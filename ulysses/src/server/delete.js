const itinerary = require("../model/itineraries.js");
const location = require("../model/locations.js");

const server = require('./server.js');

module.exports = function(app){

  app.delete('/api/itineraries/:id/', server.isAuthenticated, server.checkId, function (req, res, next) {
    itinerary.findOne({_id: req.params.id}, function(err, itinerary){
      if (err) return res.status(500).json({"error": err});
      if (!itinerary) return res.status(404).end("Itinerary id #" + req.params.id + " does not exists");
      if (itinerary.username !== req.session.username) return res.status(403).end("forbidden");
      itinerary.remove({ _id: itinerary._id }, function(err, num) {
        res.json(itinerary);
      });
    });
  });

  app.delete('/api/locations/:id/', server.isAuthenticated, server.checkId, function (req, res, next) {
    location.findOne({_id: req.params.id}, function(err, loc){
      if (err) return res.status(500).json({"error": err});
      if (!loc) return res.status(404).end("Location id #" + req.params.id + " does not exists");
      if (loc.username !== req.session.username) return res.status(403).end("forbidden");
      loc.remove({ _id: loc._id }, function(err, num) {
        res.json(loc);
      });
    });
    // @todo need to delete from itineraries locations
  });

};
