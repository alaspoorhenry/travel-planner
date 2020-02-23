/* jshint esversion: 6 */

const express = require('express');
const fs = require('fs');
const cors = require("cors");
const crypto = require('crypto');
const cookie = require('cookie');
const session = require('express-session');
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Cache-Control", "no-cache");
  next();
});

mongoose.connect("mongodb://d.gao:ulysses123@ds227146.mlab.com:27146/heroku_j780r5vr", { useNewUrlParser: true }, (err, db) => {

  if (err) {
    console.log("Unable to connect to the database. Please start the database. Error:", err);
  }
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/../../dist/ulysses'));

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

/*
   Since Heroku requires the server to be HTTP, it needs to communicate in
   http therefore the secure flag is false.
   Need to trust Heroku's SSL
 */
app.use(session({
  secret: 'this secret has changed',
  resave: false,
  saveUninitialized: true,
  cookie: {httpOnly: true, secure: false, sameSite: true}
}));

const validator = require('validator');

module.exports = {

  generateSalt: function ()
  {
    return crypto.randomBytes(16).toString('base64');
  },

  generateHash: function (password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
  },

  isAuthenticated: function (req, res, next) {
    if (!req.session.user) {
      return res.status(401).end("access denied");
    }
      next();
  },

  checkUsername: function (req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end(
      "bad input");
    next();
  },

  sanitizeContent: function (req, res, next) {
    if (!req.body.name || !req.body.date){
      return res.status(400).end("bad input");
    }
    req.body.origin = validator.escape(req.body.name);
    req.body.destination = validator.escape(req.body.date);
    next();
  },

  checkId: function (req, res, next) {
    if (!validator.isAlphanumeric(req.params.id)) return res.status(400).end(
      "bad input");
    next();
  }
};

require('./delete')(app);
require('./get')(app, cookie);
require('./patch')(app);
require('./post')(app, cookie);
// require('./put')(app);

// app.use(express.static('static'));
app.use(function (req, res, next) {
  var cookies = cookie.parse(req.headers.cookie || '');
  var username = (cookies.username) ? cookies.username : null;
  res.setHeader('Set-Cookie', cookie.serialize('username', username, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
  }));
  next();
});

/*
const https = require('https');
const PORT = 3000;

var privateKey = fs.readFileSync( './../server.key' );
var certificate = fs.readFileSync( './../server.crt' );
var config = {
  key: privateKey,
  cert: certificate
};

https.createServer(config, app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTPS server on https://localhost:%s", PORT);
});
*/

// Heroku requires the server to be HTTP, need to trust Heroku's SSL
const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
