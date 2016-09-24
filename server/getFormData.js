var deployedAppModel = require('./deployedAppSchema.js');
var jwt = require('jsonwebtoken');
var jws = require('jws');
var express = require('express');
var path = require('path');
var cloneBase = require("./cloneBase.js");
var cloneGit = require('./cloneGit.js');
var deployBase = require('./deployBase.js');
var bodyParser = require('body-parser');
var deployProject = require('./deployProject.js');
var request = require('request');
var cookieParser = require('cookie-parser');
var log = require('fs');
var logfile = "./deployment_log.log";
var deployedAppModel=require("./deployedAppSchema.js");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var mongoose=require("mongoose");

var events = require('events');
var reverseProxy = require('./reverseProxy.js');
// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();
io.sockets.on("8080", function(socket) {
    console.log("we are connected")
});
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
io.on("connection",function(socket){
	console.log("we have a connection");	
	socket.on("baseImage",function(data,data1){
		 var gitURL = data.gitURL;
		 var gitBranch = data1.gitBranch;
		 console.log(gitURL);
         console.log(gitBranch);
		 cloneBase(gitURL,socket,gitBranch);
	});
	socket.on("baseImageSubmit",function(data,data1){
		var imageName = data.imageTag;
        var locationName = data1.locationValue;
		    console.log(imageName);
        console.log(locationName);
        deployBase(imageName,deployProject,locationName,socket);
	});
  socket.on("domain",function(data){
    var domain = data.domainName;
    console.log(domain);
    reverseProxy(domain,socket);
  });
	socket.on("deploy", function(data,data1){
      console.log(data1);
      var gitURL = data.gitURL;
      var gitBranch = data1.gitBranch;
      console.log("gitURL ",gitURL);
      console.log("gitBranch",gitBranch);
      cloneGit(gitURL, deployProject, socket,gitBranch); 
  });  
  eventEmitter.on('updated',function(){
		console.log("inside event emitter");
		socket.emit("update",{update : true});
		
	});
	
  
});
var log = require('fs');

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());
app.use(cookieParser());

app.get("/log/app-fabric", function(req, res){
	res.set("Content-Type","application/log");
    res.sendfile(logfile);
});

app.use(function(req,res,next) {
	log.appendFile(logfile, "executing body-parser.", function(error){
		if (error) return console.log(error);
	});
	next();
});

app.use(express.static(__dirname + '/../client'));

app.post("/update",function(req,res,socket){
	
	console.log("service_id : "+req.body.service_id+" no. "+req.body.value+" app_id "+req.body.app_id )

	
	deployedAppModel.findById(req.body.app_id, function(err, user) {
        if (err) throw err;
        var a= user.services;
        a.map(function(data){
          if(data._id==req.body.service_id){
           data.replicas = req.body.value;
       }
   });

     // save the user
     user.save(function(err) {
       if (err) throw err;
       console.log('User successfully updated!');
	   eventEmitter.emit('updated');
	    

      
   });
  
   
 });
 res.redirect("/#/apps/req.body.app_id");
})

app.get('/auth/github/success', function(req1, res1) {
    // GET code
    var code = req1.query.code;
    console.log("requeested code is", code);
    var oauthUrl = "https://github.com/login/oauth/access_token?client_id=06ae9c621282646f4225&client_secret=8715ba33d34bf0658fe6ae558f20cc8e8de217aa&code=" + code;
	// GET Authentication Token
    var accessToken = "";
    request(oauthUrl, function(error, response2, body) {
        if (!error && response2.statusCode == 200) {
            accessToken = body.split("=")[1].split("&")[0];
            console.log("access token ", accessToken);
            // GET User Profile
            var profileUrl = "https://api.github.com/user?access_token=" + accessToken;
            request({ url: profileUrl, headers: { "User-Agent": "request" } }, function(error, response3, data) {
                // Generate JWT token
                if (!error && response3.statusCode == 200) {
                    var obj = JSON.parse(data);
                    var token = jwt.sign({ "accesstoken": accessToken, "user": "github.com/" + obj.login }, '0170263fb5ff2830816c9731d0598426aa24064');
                    console.log("Token generated is ", token);
                    console.log("User profile details " + typeof obj + " " + obj.login) // Show the HTML for the Google homepage.
                    res1.cookie('JWT', token, { maxAge: 900000 }).redirect("/#/apps");
                } else {
                    console.log(response3.statusCode);
                }
            })
        }
    });
});

app.use(function(req, res, next) {
    if (!req.cookies.JWT) {
        return res.status(403).send('You are not Authorized');
    }
    // Get cookies from client
    var verify_Token = jwt.verify(req.cookies.JWT, '0170263fb5ff2830816c9731d0598426aa24064', function(err, data) {
        if (err) {
            res.status(403).send('You are not Authorized');
            console.log(err);
        }
        next();
    });
})

var scope = {
    cloning: {
        isComplete: false,
        isInProgress: false
    },
    buildImage: {
        isComplete: false,
        isInProgress: false
    },
    deployment: {
        isComplete: false,
        isInProgress: false
    }
};

// This route receives the posted form.
app.post('/deploy', function(req, res) {
    var gitURL = req.body.gitURL;
    console.log("gitURL ", gitURL);
    cloneGit(gitURL, deployProject);
});

app.use("/deployedAppDetails", function(req, res) {

    // create a new user called chris  
    deployedAppModel.find({}, function(err, users) {
        if (err) throw err;
        res.send(users);
    });
});

//app.listen(8080);
http.listen("8080", function(){
	console.log("we are connected")
});
