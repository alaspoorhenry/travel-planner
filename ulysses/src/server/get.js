const itinerary = require("../model/itineraries.js");
const user = require("../model/users.js");
const location = require("../model/locations.js");
const path = require('path');

module.exports = function(app, cookie){

  app.get('/signout/', function (req, res, next) {
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('user', '', {
      path : '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    return res.json("user signed out");
  });

  app.get('/api/user/:userID/', function (req, res, next) {
    user.findOne({_id: req.params.userID}, function (err, usr) {
      if (err) {
        return res.status(500).json({"error": err});
      }
      return res.json(usr);
    });
  });

  app.get('/api/itineraries/:page/', function (req, res, next) {
    itinerary.find({},{},{"sort": {"updated": -1}},
      function (err, itineraries) {
        if (err) {
          return res.status(500).end(err);
        }
        var result = itineraries.slice(0 + (req.params.page * 8),
          8 + (req.params.page * 8));
        result = result.slice(Math.max(result.length - 8, 0));
        return res.json(result);
      });
  });

  app.get('/api/itineraries/user/:userID/', function (req, res, next) {
    itinerary.find({user: req.params.userID}, function (err, itineraries) {
      if (err) {
        return res.status(500).json({"error": err});

      }
      return res.json(itineraries);
    });
  });

  app.get('/api/itineraries/:id/locations/', function (req, res, next) {
    itinerary.findOne({_id: req.params.id}, function (err, itinerary) {
      if (err) {
        return res.status(500).json({"error": err});
      }
      return res.json(itinerary.locations);
    });
  });

  app.get('/api/itineraries/:id/itinerary/', function (req, res, next) {
    itinerary.findOne({_id: req.params.id}, function (err, itinerary) {
      if (err) {
        return res.status(500).json({"error": err});
      }
      return res.json(itinerary);
    });
  });

  app.get('/api/locations/:id/', function (req, res, next) {
    location.findOne({_id: req.params.id}, function (err, loc) {
      if (err) {
        return res.status(500).json({"error": err});
      }
      return res.json(loc.locations);
    });
  });

  // home page
  app.get('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../../dist/ulysses/index.html'));
  });
};
