/*jshint esversion:6 */
const user = require("../model/users.js");
const itinerary = require("../model/itineraries.js");
const location = require("../model/locations.js");
const server = require('./server.js');

module.exports = function(app, cookie){

  var multer = require('multer');
  var path = require('path');
  var upload = multer({dest: path.join(__dirname + "../..", 'uploads')});

  app.post('/signup/', server.checkUsername, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    user.findOne({"username": username}, function(err, usr){
      console.log(err);
      if (err) return res.status(500).json({"error": err});
      if (usr) return res.status(409).end("username " + username + " already exists");
      var salt = server.generateSalt();
      var hash = server.generateHash(password, salt);
      const new_user = new user();
      new_user.username = username;
      new_user.salt = salt;
      new_user.hash = hash;
      new_user.save((err) => {
        if (err) return res.status(500).json({"error": err});
        return res.json("user " + username + " signed up");
      });
    });
  });

  app.post('/signin/', server.checkUsername, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // retrieve user from the database
    user.findOne({"username": username}, function(err, usr){
      if (err) return res.status(500).json({"error": err});
      if (!usr) return res.status(401).end("access denied");
      if (usr.hash !== server.generateHash(password, usr.salt)) return res.status(401).end("access denied"); // invalid password
      // start a session
      req.session.user = usr._id;
      res.setHeader('Set-Cookie', cookie.serialize('user', usr._id, {
        path : '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
      }));
      return res.json(usr);
    });
  });

  app.post('/api/itineraries/', server.sanitizeContent, server.isAuthenticated, function (req, res, next) {
  //app.post('/api/itineraries/', server.sanitizeContent, function (req, res, next) {
    user.findOne({_id: req.session.user}, function (err, usr) {
      if (err) {
        return res.status(500).json({"error": err});
      }
      const new_itinerary = new itinerary();
      new_itinerary.user = req.session.user;
      new_itinerary.username = usr.username;
      new_itinerary.name = req.body.name;
      new_itinerary.origin = req.body.origin;
      new_itinerary.destination = req.body.destination;
      new_itinerary.date = req.body.date;
      new_itinerary.locations = [];
      new_itinerary.save(function(err, itinerary) {
        if (err) {
          return res.status(500).json({"error": err});
        }
        return res.status(200).json(itinerary);
      });
    });
  });

  app.post('/api/locations/', server.sanitizeContent, server.isAuthenticated, function (req, res, next) {
    const new_location = new location();
    new_location.user = req.session.user;
    new_location.name = req.body.name;
    new_location.geometry = req.body.geometry;
    new_location.address = req.body.address;
    new_location.postalCode = req.body.postalCode;
    new_location.photoUrl = req.body.photoUrl;
    new_location.rating = req.body.rating;
    new_location.types = req.body.types;
    new_location.totalUserRatings = req.body.totalUserRatings;
    new_location.save(function(err, loc) {
      if (err) {
        res.status(500).json({"error": err});
      }
      res.status(200).json(loc);
    });
  });

  app.post('/api/user/:id/image', upload.single('picture'), server.isAuthenticated, function (req, res, next) {
    user.findOne({_id: req.params.id}, function(err, usr){
      usr.picture = req.file;
      usr.save(function(err, usr) {
        if (err) {
          res.status(500).json({"error": err});
        }
        res.status(200).json(usr);
      });
    });
  });
};
