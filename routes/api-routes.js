var db = require("../models/index.js");
var path = require('path');
// const signupController = require('./create_new_User.js');
const passport = require('passport');
const setupPassport = require('./setupPassport.js');
const twiliovoice = require('./contactmethods/twiliovoice.js');
const twiliosms = require('./contactmethods/twiliosms.js');
const sendgrid = require('./contactmethods/sendgrid.js')


module.exports = function(app) {
  let isAuthenticated = function(req, res, next){
    if(req.isAuthenticated())
      return next()
    console.log('error', 'Need to be logged in')
    res.redirect('/')
  } 

  // app.post('/signup', signupController.signup);

  app.post('/login', function(req, res, next) {
      passport.authenticate('local', {}, function(err, user, info) {
        console.log(user)
        let userid = user.id;
       if (err) { return next(err); }
       if (!user) { return res.redirect('/'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log(req.user.username);
       return res.redirect('/dashboard/');
     });
    })(req, res, next);
  });

  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });

  app.post('/contact/twiliosms', function(req,res){
    twiliosms(req.body.phone, "You have been contacted via Solarize");
  });

  app.post('./contact/twiliovoice', function(req,res){
    twiliovoice(req.body.phone);
  });

  app.post('./contact/email', function(req,res){
    sendgrid(req.body.email, "From Solarize", "You have been contacted via Solarize");
  });



  app.get("/api/user", function(req, res) {
  db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/user", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser)
    });
  });

  app.get("/api/lead", function(req, res) {
  db.Leads.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/lead", function(req, res) {
    console.log(req.body);
    db.Leads.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/lead/:id", function(req, res) {
    db.Leads.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser)
    });
  });
}