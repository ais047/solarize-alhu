var path = require("path");
var api = require("./api-routes.js")

module.exports = function(app) {

  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../landing.html"));
  });
    app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/DashboardViews/pages/AdminView.html"));
  });

  app.get("/login", function(req,res){
  	res.sendFile(path.join(__dirname, "../public/login.html"))
  })
  app.get("/dashboard", function(req, res){
  	res.sendFile(path.join(__dirname, "../public/dashboard.html"))
  })
  app.get("/dashboard/table", function(req, res){
  	res.sendFile(path.join(__dirname, "../public/table.html"))
  })

  app.get("/leadinfo", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/leadinfo.html"));
  });


}

