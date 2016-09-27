const spawn = require('child_process').spawn;
var path = require('path');
var log = require('fs');
var logfile = "./deployment_log.log";

var cloneBase = function(gitURL,socket,gitBranch,username){
	var res = gitURL.split("/");
	var repoName = (res[res.length-1].split("."))[0];
	var cloneDirectoryPath = process.env.REPOSITORY_PATH + "/" + username + "-" + repoName + "-" + gitBranch;
	log.appendFile(logfile, "cloneBase:REPOSITORY_PATH is:: " +cloneDirectoryPath,function(error){
		if(error) return console.log(error);
	});
	var cloneParams = ['clone',gitURL,cloneDirectoryPath];
	if(gitBranch) { cloneParams.push('-b'); cloneParams.push(gitBranch); }
	const gitCloneCommand = spawn('git',cloneParams, {cwd : process.env.REPOSITORY_PATH});
	console.log("Current directory path is ", cloneDirectoryPath);

	console.log(repoName);

	gitCloneCommand.on("close",function(){
		socket.emit("clone",{isComplete: true,isInProgress: false});
	   const findDocker = spawn('find',['.' , '-name' , 'Dockerfile'],{cwd : cloneDirectoryPath});
	   var count = 0;var location = [];
		findDocker.stdout.on('data', (data) => {
	 	 console.log(`stdout: ${data}`);
	 	 console.log("command output " +data);
	 	 var locationdetails = data.toString().split('\n');
	 	 for (var i = 0 ; i < locationdetails.length ; i++){
	 	 	if(locationdetails[i].length > 0){
	 	 		location[i] = locationdetails[i];
	 	 	}

	 	 }	 	 
	 	 console.log('location:', location);
	 	 socket.emit("location",location);

		});
	});
}	
 

module.exports = cloneBase; 