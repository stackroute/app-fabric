var express = require('express');
var path = require('path');
var cloneGit = require('./cloneGit.js');
var bodyParser = require('body-parser');
var deployProject = require('./deployProject.js');
// create our app
var app = express();

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

app.use(function(req,res,next) {
  console.log('REQ BODY IS:',req.body);
  next();
});

app.use(express.static(__dirname + '/../client'));



// This route receives the posted form.
app.post('/deploy', function(req, res){
  var gitURL = req.body.gitURL;
  console.log("gitURL ",gitURL);
  cloneGit(gitURL, deployProject);  

});

app.listen(8080);
